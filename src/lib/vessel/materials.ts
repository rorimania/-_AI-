import * as THREE from 'three';

interface GlazeOptions {
  color?: string;
  roughness?: number;
  clearcoat?: number;
  bumpStrength?: number;
}

function randomSource(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/**
 * Fine ceramic surface: low-frequency glaze undulation, a few vertical
 * flow streaks and hairline crackle. Used as a bump map only; the color
 * stays art-directed so the celadon reads consistently in every scene.
 */
function createCeramicBumpMap(renderer: THREE.WebGLRenderer): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d canvas unavailable');

  const image = ctx.createImageData(size, size);
  const random = randomSource(0x9e3779b9);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const wave =
        Math.sin(x * 0.031 + Math.sin(y * 0.017) * 2.1) * 5.2 +
        Math.sin(y * 0.049 + x * 0.009) * 3.4 +
        Math.sin((x + y) * 0.012) * 4.1;
      const grain = (random() - 0.5) * 13;
      const value = Math.max(0, Math.min(255, 128 + wave + grain));
      image.data[index] = value;
      image.data[index + 1] = value;
      image.data[index + 2] = value;
      image.data[index + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);

  // Glaze flow: faint vertical streaks.
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  for (let i = 0; i < 28; i += 1) {
    const x = random() * size;
    const top = random() * size * 0.4;
    const bottom = size - random() * size * 0.25;
    const alpha = 0.025 + random() * 0.05;
    const gradient = ctx.createLinearGradient(x, top, x + 14, bottom);
    gradient.addColorStop(0, `rgba(88,88,88,0)`);
    gradient.addColorStop(0.4, `rgba(88,88,88,${alpha})`);
    gradient.addColorStop(1, `rgba(88,88,88,0)`);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1 + random() * 2.4;
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.bezierCurveTo(x + 10, size * 0.4, x - 12, size * 0.7, x + 4, bottom);
    ctx.stroke();
  }
  ctx.restore();

  // Hairline crackle.
  ctx.save();
  ctx.strokeStyle = 'rgba(96,96,96,0.34)';
  ctx.lineWidth = 0.65;
  for (let line = 0; line < 26; line += 1) {
    let x = random() * size;
    let y = random() * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const segments = 2 + Math.floor(random() * 4);
    for (let segment = 0; segment < segments; segment += 1) {
      x += (random() - 0.5) * 54;
      y += 8 + random() * 30;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 3);
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function createGlazeMaterial(
  renderer: THREE.WebGLRenderer,
  options: GlazeOptions = {},
): THREE.MeshPhysicalMaterial {
  const bumpMap = createCeramicBumpMap(renderer);

  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(options.color ?? '#c3d6c9'),
    roughness: options.roughness ?? 0.2,
    metalness: 0,
    clearcoat: options.clearcoat ?? 0.95,
    clearcoatRoughness: 0.07,
    ior: 1.5,
    specularIntensity: 1,
    envMapIntensity: 1.18,
    side: THREE.DoubleSide,
    bumpMap,
    bumpScale: options.bumpStrength ?? 0.0028,
  });
}

let focusAlphaMap: THREE.CanvasTexture | null = null;

/** Soft vertical mask so the focus tint has no hard top/bottom edges. */
function getFocusAlphaMap(): THREE.CanvasTexture {
  if (focusAlphaMap) return focusAlphaMap;

  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d canvas unavailable');

  for (let y = 0; y < 256; y += 1) {
    const t = y / 255;
    const distance = Math.min(t, 1 - t);
    const fade = Math.min(1, distance / 0.19);
    const eased = fade * fade * (3 - 2 * fade);
    const value = Math.round(255 * eased);
    ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
    ctx.fillRect(0, y, 4, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;
  focusAlphaMap = texture;
  return texture;
}

export function createFocusBandMaterial(): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color('#557f6b'),
    transparent: true,
    opacity: 0,
    alphaMap: getFocusAlphaMap(),
    side: THREE.DoubleSide,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
}
