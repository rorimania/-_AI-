import * as THREE from 'three';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';

const HDRI_URL = '/assets/hdri/studio_small_03_1k.hdr';

function createFallbackCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d canvas unavailable');

  const sky = ctx.createLinearGradient(0, 0, 0, 512);
  sky.addColorStop(0, '#fff8ec');
  sky.addColorStop(0.35, '#f2e7d6');
  sky.addColorStop(0.62, '#c6b9a7');
  sky.addColorStop(1, '#5b5146');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 1024, 512);

  const softbox = (x: number, y: number, radius: number, alpha: number, color: string) => {
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, color);
    glow.addColorStop(0.22, `rgba(255, 249, 236, ${alpha})`);
    glow.addColorStop(1, 'rgba(255, 249, 236, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  };

  softbox(250, 150, 200, 0.82, 'rgba(255, 255, 255, 0.95)');
  softbox(770, 120, 150, 0.68, 'rgba(255, 244, 222, 0.9)');
  softbox(520, 330, 260, 0.22, 'rgba(255, 232, 198, 0.5)');

  return canvas;
}

/**
 * Real studio HDRI, with a procedural studio as the immediate and failure
 * fallback. Setting scene.environment updates the glaze reflections.
 */
export function createStudioEnvironment(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
): { dispose: () => void } {
  let disposed = false;
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const fallbackCanvas = createFallbackCanvas();
  const fallbackTexture = new THREE.CanvasTexture(fallbackCanvas);
  fallbackTexture.mapping = THREE.EquirectangularReflectionMapping;
  fallbackTexture.colorSpace = THREE.SRGBColorSpace;

  let fallbackTarget: THREE.WebGLRenderTarget | null = null;
  try {
    fallbackTarget = pmrem.fromEquirectangular(fallbackTexture);
    scene.environment = fallbackTarget.texture;
    scene.environmentIntensity = 0.88;
  } catch {
    fallbackTarget = null;
  }
  fallbackTexture.dispose();

  let hdriTarget: THREE.WebGLRenderTarget | null = null;
  const loader = new HDRLoader();
  loader.load(
    HDRI_URL,
    (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.mapping = THREE.EquirectangularReflectionMapping;
      try {
        const target = pmrem.fromEquirectangular(texture);
        hdriTarget = target;
        scene.environment = target.texture;
        scene.environmentIntensity = 0.94;
        if (fallbackTarget) {
          fallbackTarget.dispose();
          fallbackTarget = null;
        }
      } catch {
        // keep the procedural studio
      } finally {
        texture.dispose();
      }
    },
    undefined,
    () => {
      // Local HDRI missing: the fallback studio is already active.
    },
  );

  return {
    dispose() {
      disposed = true;
      scene.environment = null;
      fallbackTarget?.dispose();
      hdriTarget?.dispose();
      pmrem.dispose();
    },
  };
}

export function addStudioLights(scene: THREE.Scene) {
  const ambient = new THREE.AmbientLight(0xfff5e8, 0.15);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xfff0d8, 1.05);
  key.position.set(4.5, 6.5, 4.5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xf4ecdf, 0.35);
  fill.position.set(-4.5, 2.0, 3.0);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xdce9ff, 0.62);
  rim.position.set(1.5, 3.5, -5.0);
  scene.add(rim);
}

export function createContactShadow(): THREE.Mesh {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d canvas unavailable');

  ctx.translate(128, 128);
  ctx.scale(1, 0.44);
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 124);
  gradient.addColorStop(0, 'rgba(52, 37, 23, 0.48)');
  gradient.addColorStop(0.36, 'rgba(52, 37, 23, 0.27)');
  gradient.addColorStop(0.72, 'rgba(52, 37, 23, 0.08)');
  gradient.addColorStop(1, 'rgba(52, 37, 23, 0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, 124, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    opacity: 0.64,
    toneMapped: false,
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.72, 1.72), material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(-0.05, -1.197, -0.03);
  mesh.renderOrder = 2;
  return mesh;
}
