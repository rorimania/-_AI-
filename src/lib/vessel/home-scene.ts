import * as THREE from 'three';
import { PART_ORDER, PART_RANGES, defaultProfile, radiusAt, type PartId } from './profile';
import {
  createBoundaryRingGeometry,
  createDecorationBandGeometry,
  createPartBandGeometries,
  createVesselGeometry,
  resolveDimensions,
} from './geometry';
import { createFocusBandMaterial, createGlazeMaterial } from './materials';
import {
  addStudioLights,
  createContactShadow,
  createStudioEnvironment,
} from './environment';
import { createFloralPatternTexture } from './decoration';

interface CameraKey {
  state: number;
  targetY: number;
  distance: number;
  rotate: number;
}

const CAMERA_KEYS: CameraKey[] = [
  { state: -1, targetY: 0.12, distance: 5.1, rotate: -0.5 },
  { state: 0, targetY: 0.86, distance: 2.85, rotate: 0.1 },
  { state: 1, targetY: 0.6, distance: 2.95, rotate: 0.55 },
  { state: 2, targetY: 0.27, distance: 3.2, rotate: 1.0 },
  { state: 3, targetY: -0.12, distance: 3.4, rotate: 1.5 },
  { state: 4, targetY: -0.9, distance: 2.9, rotate: 2.05 },
];

const CAMERA_X = 0.64;
const CAMERA_Y_OFFSET = 0.42;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smoothstep = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

function sampleKeys(state: number): CameraKey {
  const s = clamp(state, CAMERA_KEYS[0].state, CAMERA_KEYS[CAMERA_KEYS.length - 1].state);
  for (let i = 0; i < CAMERA_KEYS.length - 1; i += 1) {
    const a = CAMERA_KEYS[i];
    const b = CAMERA_KEYS[i + 1];
    if (s > b.state) continue;
    const t = smoothstep((s - a.state) / Math.max(1e-5, b.state - a.state));
    return {
      state: s,
      targetY: THREE.MathUtils.lerp(a.targetY, b.targetY, t),
      distance: THREE.MathUtils.lerp(a.distance, b.distance, t),
      rotate: THREE.MathUtils.lerp(a.rotate, b.rotate, t),
    };
  }
  return CAMERA_KEYS[CAMERA_KEYS.length - 1];
}

function focusWeight(state: number, index: number): number {
  if (state < -0.34) return 0;
  const distance = Math.abs(state - index);
  return 1 - smoothstep((distance - 0.06) / 0.64);
}

const disposedTextures = new Set<THREE.Texture>();

function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    const geometry = mesh.geometry as THREE.BufferGeometry | undefined;
    geometry?.dispose();

    const materials = mesh.material
      ? Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material]
      : [];

    for (const material of materials) {
      for (const value of Object.values(material as unknown as Record<string, unknown>)) {
        if (value && (value as THREE.Texture).isTexture) {
          const texture = value as THREE.Texture;
          if (!disposedTextures.has(texture)) {
            disposedTextures.add(texture);
            texture.dispose();
          }
        }
      }
      material.dispose();
    }
  });
}

/**
 * Home “观器” scene. The scroll observer publishes a continuous state
 * from -1 (hero) to 4 (foot); this scene turns it into camera focus,
 * zoom and vessel rotation.
 */
export function mountHomeScene(host: HTMLElement, stage: HTMLElement | null): () => void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 760px)').matches;

  let renderer: THREE.WebGLRenderer;
  const canvas = document.createElement('canvas');
  canvas.className = 'vessel-canvas__render';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  host.appendChild(canvas);

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
  } catch {
    canvas.remove();
    return () => {};
  }

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.shadowMap.enabled = false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);

  const dimensions = resolveDimensions({
    radialSegments: isMobile ? 96 : 128,
  });

  const vesselGroup = new THREE.Group();
  scene.add(vesselGroup);

  const vesselMaterial = createGlazeMaterial(renderer, {
    color: '#a9c4b4',
    roughness: 0.22,
    clearcoat: 0.92,
    bumpStrength: 0.0026,
  });
  const vessel = new THREE.Mesh(createVesselGeometry(defaultProfile, dimensions), vesselMaterial);
  vesselGroup.add(vessel);

  const decoration = new THREE.Mesh(
    createDecorationBandGeometry(defaultProfile, 0.1, 0.81, dimensions),
    new THREE.MeshPhysicalMaterial({
      map: createFloralPatternTexture(renderer, isMobile),
      color: '#ffffff',
      roughness: 0.26,
      metalness: 0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1,
      transparent: true,
      alphaTest: 0.015,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  decoration.rotation.y = Math.PI;
  decoration.scale.set(1.004, 1.001, 1.004);
  decoration.renderOrder = 0;
  vesselGroup.add(decoration);

  const bandGeometries = createPartBandGeometries(defaultProfile, dimensions);
  const bands = PART_ORDER.map((part: PartId) => {
    const material = createFocusBandMaterial();
    const mesh = new THREE.Mesh(bandGeometries[part], material);
    mesh.scale.set(1.0026, 1.001, 1.0026);
    mesh.renderOrder = 1;
    vesselGroup.add(mesh);
    return { part, mesh, material };
  });

  const focusRings = PART_ORDER.map((part) => {
    const range = PART_RANGES[part];
    const y = (range[0] + range[1]) / 2;
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color('#3f6b58'),
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const ring = new THREE.LineLoop(
      createBoundaryRingGeometry(defaultProfile, y, dimensions),
      material,
    );
    ring.renderOrder = 2;
    vesselGroup.add(ring);
    return { material };
  });


  const shadow = createContactShadow();
  scene.add(shadow);

  addStudioLights(scene);
  const environment = createStudioEnvironment(renderer, scene);

  let width = 1;
  let height = 1;
  let dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

  const resize = () => {
    const rect = host.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
  };

  let targetState = -1;
  let currentState = -1;
  let visible = true;
  let disposed = false;
  let frameId = 0;
  let lastTime = performance.now();
  let hoverX = 0;
  let hoverY = 0;
  let hoverActive = false;
  let anchorTick = 0;
  let autoSpin = 0;

  const onObserve = (event: Event) => {
    const detail = (event as CustomEvent<{ state?: number }>).detail;
    if (detail && typeof detail.state === 'number' && Number.isFinite(detail.state)) {
      targetState = clamp(detail.state, -1, 4);
    }
  };
  document.addEventListener('ciyun:observe', onObserve);

  const onVisibility = () => {
    lastTime = performance.now();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const onPointerMove = (event: PointerEvent) => {
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    hoverX = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
    hoverY = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    hoverActive = true;
  };

  const onPointerLeave = () => {
    hoverX = 0;
    hoverY = 0;
    hoverActive = false;
  };

  stage?.addEventListener('pointermove', onPointerMove, { passive: true });
  stage?.addEventListener('pointerleave', onPointerLeave);

  const targetCamera = sampleKeys(-1);
  camera.position.set(CAMERA_X, targetCamera.targetY + CAMERA_Y_OFFSET, targetCamera.distance);
  camera.lookAt(0, targetCamera.targetY, 0);
  vesselGroup.rotation.y = targetCamera.rotate;

  resize();

  const firstRender = () => {
    renderer.render(scene, camera);
    host.classList.add('is-ready');
    stage?.classList.add('is-3d-ready');
  };

  const anchorPoint = new THREE.Vector3();
  const anchorBase = Math.PI * 0.5;

  const emitAnchors = () => {
    if (!stage) return;
    if (anchorTick++ % 2 !== 0) return;
    camera.updateMatrixWorld();
    vesselGroup.updateMatrixWorld(true);

    const cameraAngle = Math.atan2(
      camera.position.x - vesselGroup.position.x,
      camera.position.z - vesselGroup.position.z,
    );
    const localBase = cameraAngle - vesselGroup.rotation.y;

    const anchors = PART_ORDER.map((part) => {
      const range = PART_RANGES[part];
      const y = (range[0] + range[1]) / 2;
      const radius = radiusAt(defaultProfile, y) * dimensions.radiusScale * 1.014;
      const angle = localBase + anchorBase;
      anchorPoint.set(
        Math.sin(angle) * radius,
        (y - 0.5) * dimensions.height,
        Math.cos(angle) * radius,
      );
      vesselGroup.localToWorld(anchorPoint);
      anchorPoint.project(camera);
      return {
        id: part,
        x: (anchorPoint.x * 0.5 + 0.5) * width,
        y: (-anchorPoint.y * 0.5 + 0.5) * height,
        visible: anchorPoint.z < 1,
      };
    });

    document.dispatchEvent(
      new CustomEvent('ciyun:vessel-anchors', {
        detail: { anchors, width, height },
      }),
    );
  };

  const renderFrame = (now: number) => {
    frameId = window.requestAnimationFrame(renderFrame);
    const delta = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;

    if (!visible || document.hidden) return;

    if (reduceMotion) {
      currentState = targetState;
    } else {
      const factor = 1 - Math.exp(-delta * 7);
      currentState += (targetState - currentState) * factor;
      if (Math.abs(targetState - currentState) < 0.0008) currentState = targetState;
    }

    const displayState = currentState;
    const key = sampleKeys(displayState);

    const hoverFactor = hoverActive && !reduceMotion ? 1 : 0;
    camera.position.set(
      CAMERA_X + hoverX * 0.075 * hoverFactor,
      key.targetY + CAMERA_Y_OFFSET - hoverY * 0.04 * hoverFactor,
      key.distance,
    );
    camera.lookAt(0, key.targetY, 0);
    host.dataset.state = currentState.toFixed(3);
    host.dataset.target = targetState.toFixed(3);
    host.dataset.distance = key.distance.toFixed(2);
    host.dataset.targetY = key.targetY.toFixed(2);

    if (!reduceMotion) autoSpin += delta * 0.24;
    vesselGroup.rotation.y = key.rotate + autoSpin;
    vesselGroup.rotation.z = reduceMotion ? 0 : Math.sin(currentState * 0.9) * 0.012;
    host.dataset.rotation = vesselGroup.rotation.y.toFixed(3);

    const bandState = currentState;
    for (let index = 0; index < bands.length; index += 1) {
      const targetOpacity = 0.17 * focusWeight(bandState, index);
      const band = bands[index];
      if (reduceMotion) {
        band.material.opacity = targetOpacity;
      } else {
        band.material.opacity += (targetOpacity - band.material.opacity) * (1 - Math.exp(-delta * 9));
      }
    }

    for (let index = 0; index < focusRings.length; index += 1) {
      const ring = focusRings[index];
      const targetOpacity = 0.11 + 0.48 * focusWeight(bandState, index);
      if (reduceMotion) ring.material.opacity = targetOpacity;
      else {
        ring.material.opacity +=
          (targetOpacity - ring.material.opacity) * (1 - Math.exp(-delta * 9));
      }
    }

    emitAnchors();
    renderer.render(scene, camera);
  };

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (disposed) return;
    renderer.render(scene, camera);
  });
  resizeObserver.observe(host);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      lastTime = performance.now();
    },
    { rootMargin: '120px 0px', threshold: 0 },
  );
  intersectionObserver.observe(host);

  document.dispatchEvent(new CustomEvent('ciyun:observe-request'));
  firstRender();
  frameId = window.requestAnimationFrame(renderFrame);

  return () => {
    if (disposed) return;
    disposed = true;
    window.cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener('ciyun:observe', onObserve);
    document.removeEventListener('visibilitychange', onVisibility);
    stage?.removeEventListener('pointermove', onPointerMove);
    stage?.removeEventListener('pointerleave', onPointerLeave);
    environment.dispose();
    disposeScene(scene);
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    host.classList.remove('is-ready');
    stage?.classList.remove('is-3d-ready');
  };
}
