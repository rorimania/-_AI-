import * as THREE from 'three';
import {
  MIN_RADIUS,
  MAX_RADIUS,
  PROFILE_PRESET_BY_ID,
  PROFILE_PRESETS,
  defaultProfile,
  radiusAt,
  type ProfilePoint,
} from './profile';
import {
  createVesselGeometry,
  resolveDimensions,
  type VesselDimensions,
} from './geometry';
import { createGlazeMaterial } from './materials';
import {
  addStudioLights,
  createContactShadow,
  createStudioEnvironment,
} from './environment';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export interface WheelSceneOptions {
  onEdit?: (count: number) => void;
  onPreset?: (id: string, label: string) => void;
}

export interface WheelSceneHandle {
  destroy: () => void;
  setPreset: (id: string) => void;
  smooth: () => void;
  undo: () => void;
  reset: () => void;
  setMode: (mode: 'shape' | 'rotate') => void;
  getState: () => { preset: string; presetLabel: string; edits: number };
}

const PROFILE_CONTROLS = defaultProfile.length;

function cloneProfile(points: ProfilePoint[]): ProfilePoint[] {
  return points.map((point) => ({ ...point }));
}

function createTurntable() {
  const group = new THREE.Group();

  const plinthMaterial = new THREE.MeshStandardMaterial({
    color: '#94785c',
    roughness: 0.72,
    metalness: 0.03,
  });
  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(1.06, 1.13, 0.075, 128),
    plinthMaterial,
  );
  plinth.position.y = -1.245;
  group.add(plinth);

  const topMaterial = new THREE.MeshPhysicalMaterial({
    color: '#bca283',
    roughness: 0.48,
    metalness: 0.02,
    clearcoat: 0.22,
    clearcoatRoughness: 0.52,
  });
  const top = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.022, 128), topMaterial);
  top.position.y = -1.2;
  group.add(top);

  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(1.0, 0.012, 8, 160),
    new THREE.MeshBasicMaterial({
      color: '#6b543d',
      transparent: true,
      opacity: 0.36,
    }),
  );
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -1.19;
  group.add(rim);

  const innerRing = new THREE.Mesh(
    new THREE.RingGeometry(0.46, 0.475, 96),
    new THREE.MeshBasicMaterial({
      color: '#f3e8d5',
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  innerRing.rotation.x = -Math.PI / 2;
  innerRing.position.y = -1.188;
  group.add(innerRing);

  // Fine turntable grooves keep the disc from reading as a flat circle.
  const grooveMaterial = new THREE.LineBasicMaterial({
    color: '#6b543d',
    transparent: true,
    opacity: 0.18,
  });
  const groovePoints: THREE.Vector3[] = [];
  for (let i = 0; i < 72; i += 1) {
    const angle = (i / 72) * Math.PI * 2;
    const inner = 0.55;
    const outer = i % 6 === 0 ? 0.965 : 0.9;
    groovePoints.push(
      new THREE.Vector3(Math.cos(angle) * inner, -1.186, Math.sin(angle) * inner),
      new THREE.Vector3(Math.cos(angle) * outer, -1.186, Math.sin(angle) * outer),
    );
  }
  const grooves = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(groovePoints),
    grooveMaterial,
  );
  group.add(grooves);

  return group;
}

/**
 * The second stage of the journey is an actual wheel, not a poster.
 * Drag the silhouette left/right to work the clay; the lathe rebuilds
 * from a radius profile every frame.
 */
export function mountWheelScene(
  host: HTMLElement,
  stage: HTMLElement,
  options: WheelSceneOptions = {},
): WheelSceneHandle {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 860px)').matches;

  let renderer: THREE.WebGLRenderer;
  const canvas = document.createElement('canvas');
  canvas.className = 'wheel-canvas__render';
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
    return {
      destroy: () => {},
      setPreset: () => {},
      smooth: () => {},
      undo: () => {},
      reset: () => {},
      setMode: () => {},
      getState: () => ({ preset: 'meiping', presetLabel: '梅瓶', edits: 0 }),
    };
  }

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.shadowMap.enabled = false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 30);
  const cameraBase = new THREE.Vector3(0.24, 0.32, 5.7);
  const lookTarget = new THREE.Vector3(0, 0.01, 0);

  const dimensions: VesselDimensions = resolveDimensions({
    height: 2.4,
    radiusScale: 1.32,
    radialSegments: isMobile ? 96 : 128,
  });

  let profile = cloneProfile(defaultProfile);
  let presetId = 'meiping';
  let presetLabel = '梅瓶';
  let edits = 0;
  let mode: 'shape' | 'rotate' = 'shape';
  let autoRotate = !reduceMotion;
  let spin = 0;
  let zoom = 1;
  let pointerYaw = 0;
  let hoverX = 0;
  let hoverY = 0;
  let dirty = true;

  const vesselGroup = new THREE.Group();
  scene.add(vesselGroup);
  vesselGroup.add(createTurntable());

  const clayMaterial = createGlazeMaterial(renderer, {
    color: '#b8865d',
    roughness: 0.58,
    clearcoat: 0.14,
    bumpStrength: 0.0042,
  });
  clayMaterial.clearcoatRoughness = 0.6;
  clayMaterial.envMapIntensity = 0.78;

  let vesselMesh = new THREE.Mesh(createVesselGeometry(profile, dimensions), clayMaterial);
  vesselMesh.rotation.y = 0.24;
  vesselGroup.add(vesselMesh);

  const shadow = createContactShadow();
  shadow.scale.setScalar(1.16);
  shadow.position.y = -1.198;
  (shadow.material as THREE.MeshBasicMaterial).opacity = 0.52;
  vesselGroup.add(shadow);

  addStudioLights(scene);

  const key = new THREE.DirectionalLight(0xffe9cf, 1.25);
  key.position.set(3.2, 4.6, 3.6);
  scene.add(key);

  const environment = createStudioEnvironment(renderer, scene);

  const activeRingMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color('#426756'),
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  let activeRing = new THREE.LineLoop(new THREE.BufferGeometry(), activeRingMaterial);
  activeRing.renderOrder = 3;
  vesselGroup.add(activeRing);

  const undoStack: ProfilePoint[][] = [];
  let activeIndex = -1;
  let activeY = 0.5;
  let dragging = false;
  let dragPointer: number | null = null;
  let lastX = 0;
  let gesturePixels = 0;
  let gestureCounted = false;
  let width = 1;
  let height = 1;
  let visible = true;
  let disposed = false;
  let frameId = 0;
  let lastTime = performance.now();
  let ringDirty = true;

  const hostEl = host;

  const markEdited = () => {
    if (gestureCounted) return;
    gestureCounted = true;
    edits += 1;
    options.onEdit?.(edits);
    stage.dataset.edits = String(edits);
  };

  const rebuildGeometry = () => {
    const next = createVesselGeometry(profile, dimensions);
    vesselMesh.geometry.dispose();
    vesselMesh.geometry = next;
    dirty = false;
    ringDirty = true;
  };

  const updateRing = () => {
    if (!ringDirty) return;
    ringDirty = false;
    const y = clamp(activeY, 0.02, 0.98);
    const radius = radiusAt(profile, y) * dimensions.radiusScale * 1.008;
    const points: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i < segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          (y - 0.5) * dimensions.height,
          Math.sin(angle) * radius,
        ),
      );
    }
    activeRing.geometry.dispose();
    activeRing.geometry = new THREE.BufferGeometry().setFromPoints(points);
  };

  const resize = () => {
    const rect = hostEl.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    camera.aspect = width / height;
    const baseDistance = width / height > 1.05 ? 5.7 : 6.15;
    cameraBase.z = baseDistance;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.4 : 1.8));
    renderer.setSize(width, height, false);
  };

  const screenToProfileY = (clientY: number) => {
    const rect = hostEl.getBoundingClientRect();
    const top = rect.top + rect.height * 0.12;
    const bottom = rect.top + rect.height * 0.9;
    return clamp(1 - (clientY - top) / Math.max(1, bottom - top), 0, 1);
  };

  const nearestIndex = (y: number) => {
    let best = 1;
    let bestDistance = Infinity;
    profile.forEach((point, index) => {
      if (index === 0 || index === profile.length - 1) return;
      const distance = Math.abs(point.y - y);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    });
    return best;
  };

  const applyDelta = (index: number, delta: number) => {
    for (let i = 1; i < PROFILE_CONTROLS - 1; i += 1) {
      const distance = Math.abs(i - index);
      if (distance > 2) continue;
      const weight = distance === 0 ? 1 : distance === 1 ? 0.42 : 0.16;
      profile[i].r = clamp(profile[i].r + delta * weight, MIN_RADIUS, MAX_RADIUS);
    }
    // A light pass keeps the silhouette curated instead of letting a single
    // drag create a kink in the lathe.
    for (let i = 1; i < PROFILE_CONTROLS - 1; i += 1) {
      profile[i].r = clamp(
        profile[i].r * 0.78 + (profile[i - 1].r + profile[i + 1].r) * 0.11,
        MIN_RADIUS,
        MAX_RADIUS,
      );
    }
    dirty = true;
    ringDirty = true;
  };

  const pointerPositionX = (event: PointerEvent) => {
    const rect = hostEl.getBoundingClientRect();
    return event.clientX - rect.left;
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    if (dragPointer !== null) return;
    dragPointer = event.pointerId;
    dragging = true;
    gesturePixels = 0;
    gestureCounted = false;
    lastX = pointerPositionX(event);
    canvas.setPointerCapture(event.pointerId);
    stage.classList.add('is-shaping');
    event.preventDefault();

    if (mode === 'shape') {
      activeY = screenToProfileY(event.clientY);
      activeIndex = nearestIndex(activeY);
      undoStack.push(cloneProfile(profile));
      if (undoStack.length > 24) undoStack.shift();
      activeRingMaterial.opacity = 0.58;
      stage.dataset.activePoint = String(activeIndex);
      ringDirty = true;
      updateRing();
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging || event.pointerId !== dragPointer) return;
    const nextX = pointerPositionX(event);
    const dx = nextX - lastX;
    lastX = nextX;
    gesturePixels += Math.abs(dx);

    if (gesturePixels > 3) markEdited();

    if (mode === 'shape') {
      if (activeIndex < 0) return;
      const sensitivity = 0.46 / Math.max(420, width);
      applyDelta(activeIndex, dx * sensitivity * dimensions.radiusScale * 2.15);
    } else {
      pointerYaw += dx * 0.006;
    }

    event.preventDefault();
  };

  const finishPointer = (event: PointerEvent) => {
    if (event.pointerId !== dragPointer) return;
    if (mode === 'shape' && activeIndex >= 0 && undoStack.length) {
      const last = undoStack[undoStack.length - 1];
      const changed = last.some((point, index) => Math.abs(point.r - profile[index].r) > 0.0005);
      if (!changed) undoStack.pop();
    }
    dragPointer = null;
    dragging = false;
    activeIndex = -1;
    activeRingMaterial.opacity = 0;
    stage.classList.remove('is-shaping');
    delete stage.dataset.activePoint;
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch {
      // pointer already released
    }
  };

  const onPointerLeave = () => {
    if (!dragging) {
      hoverX *= 0.4;
      hoverY *= 0.4;
    }
  };

  const setPreset = (id: string) => {
    const preset = PROFILE_PRESET_BY_ID[id];
    if (!preset) return;
    undoStack.push(cloneProfile(profile));
    profile = cloneProfile(preset.profile);
    presetId = preset.id;
    presetLabel = preset.label;
    edits = 0;
    dirty = true;
    ringDirty = true;
    updateRing();
    stage.dataset.preset = preset.id;
    options.onPreset?.(preset.id, preset.label);
  };

  const smooth = () => {
    undoStack.push(cloneProfile(profile));
    const next = cloneProfile(profile);
    for (let i = 1; i < profile.length - 1; i += 1) {
      next[i].r = (profile[i - 1].r + profile[i].r * 2 + profile[i + 1].r) / 4;
    }
    profile = next;
    dirty = true;
    ringDirty = true;
    updateRing();
    edits += 1;
    options.onEdit?.(edits);
    stage.dataset.edits = String(edits);
  };

  const undo = () => {
    const previous = undoStack.pop();
    if (!previous) return;
    profile = previous;
    dirty = true;
    ringDirty = true;
    updateRing();
  };

  const reset = () => {
    undoStack.push(cloneProfile(profile));
    const preset = PROFILE_PRESET_BY_ID[presetId] ?? PROFILE_PRESETS[0];
    profile = cloneProfile(preset.profile);
    edits = 0;
    dirty = true;
    ringDirty = true;
    updateRing();
    stage.dataset.edits = '0';
    options.onEdit?.(0);
  };

  const setMode = (nextMode: 'shape' | 'rotate') => {
    mode = nextMode;
    stage.dataset.wheelMode = nextMode;
    autoRotate = nextMode === 'shape' && !reduceMotion;
  };

  const onVisibility = () => {
    lastTime = performance.now();
  };

  const onWheelZoom = (event: WheelEvent) => {
    if (!visible) return;
    event.preventDefault();
    zoom = clamp(zoom + event.deltaY * 0.00055, 0.84, 1.16);
  };

  const onWheelPointer = (event: PointerEvent) => {
    if (!visible || document.hidden) return;
    if (event.pointerType === 'mouse') {
      const rect = hostEl.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
      hoverX = nx;
      hoverY = ny;
      canvas.style.cursor = dragging ? 'grabbing' : 'grab';
      host.style.setProperty('--parallax-x', nx.toFixed(3));
      host.style.setProperty('--parallax-y', ny.toFixed(3));
    }
  };

  canvas.style.cursor = 'grab';
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointermove', onWheelPointer);
  canvas.addEventListener('pointerup', finishPointer);
  canvas.addEventListener('pointercancel', finishPointer);
  canvas.addEventListener('pointerleave', onPointerLeave);
  stage.addEventListener('wheel', onWheelZoom, { passive: false });
  document.addEventListener('visibilitychange', onVisibility);

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (!disposed) renderer.render(scene, camera);
  });
  resizeObserver.observe(hostEl);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      lastTime = performance.now();
    },
    { rootMargin: '160px 0px', threshold: 0 },
  );
  intersectionObserver.observe(hostEl);

  resize();
  camera.position.copy(cameraBase);
  camera.lookAt(lookTarget);
  camera.updateMatrixWorld();

  const firstRender = () => {
    renderer.render(scene, camera);
    hostEl.classList.add('is-ready');
    stage.classList.add('is-3d-ready');
    stage.dataset.preset = presetId;
    stage.dataset.edits = '0';
    stage.dataset.wheelMode = mode;
  };

  const renderFrame = (now: number) => {
    frameId = window.requestAnimationFrame(renderFrame);
    const delta = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
    lastTime = now;
    if (!visible || document.hidden) return;

    if (dirty) rebuildGeometry();
    updateRing();

    if (!dragging) {
      if (autoRotate && !reduceMotion) spin += delta * 0.17;
      else if (!autoRotate && !reduceMotion) spin += delta * 0.012;
    }
    vesselGroup.rotation.y = spin + pointerYaw;

    const targetX = cameraBase.x + hoverX * 0.055 + pointerYaw * 0.04;
    const targetY = cameraBase.y - hoverY * 0.028;
    camera.position.lerp(
      new THREE.Vector3(targetX, targetY, cameraBase.z * zoom),
      reduceMotion ? 1 : 0.08,
    );
    camera.position.x = clamp(camera.position.x, -0.42, 0.42);
    camera.lookAt(lookTarget);

    if (activeRingMaterial.opacity > 0) {
      activeRingMaterial.opacity += (0.5 - activeRingMaterial.opacity) * 0.2;
    }

    renderer.render(scene, camera);
  };

  firstRender();
  frameId = window.requestAnimationFrame(renderFrame);

  return {
    destroy() {
      if (disposed) return;
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointermove', onWheelPointer);
      canvas.removeEventListener('pointerup', finishPointer);
      canvas.removeEventListener('pointercancel', finishPointer);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      stage.removeEventListener('wheel', onWheelZoom);
      document.removeEventListener('visibilitychange', onVisibility);
      environment.dispose();
      vesselMesh.geometry.dispose();
      clayMaterial.dispose();
      activeRing.geometry.dispose();
      activeRingMaterial.dispose();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh === vesselMesh) return;
        mesh.geometry?.dispose?.();
        const materials = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : [];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      hostEl.classList.remove('is-ready');
      stage.classList.remove('is-3d-ready', 'is-shaping');
    },
    setPreset,
    smooth,
    undo,
    reset,
    setMode,
    getState: () => ({ preset: presetId, presetLabel, edits }),
  };
}
