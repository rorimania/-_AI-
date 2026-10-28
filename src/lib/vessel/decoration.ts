import * as THREE from 'three';

type Ctx = CanvasRenderingContext2D;

const INK = 'rgba(48, 78, 62, 0.82)';
const DEEP = 'rgba(76, 109, 91, 0.62)';
const MID = 'rgba(126, 155, 133, 0.54)';
const PALE = 'rgba(203, 223, 204, 0.66)';
const CREAM = 'rgba(247, 247, 237, 0.74)';
const HILITE = 'rgba(250, 251, 244, 0.86)';

function petal(
  ctx: Ctx,
  length: number,
  width: number,
  fill: string,
  line = 2,
  rotation = 0,
) {
  ctx.save();
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(width, -length * 0.24, width * 0.72, -length * 0.82, 0, -length);
  ctx.bezierCurveTo(-width * 0.72, -length * 0.82, -width, -length * 0.24, 0, 0);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = line;
  ctx.stroke();
  ctx.restore();
}

function leaf(
  ctx: Ctx,
  x: number,
  y: number,
  length: number,
  width: number,
  rotation: number,
  fill = MID,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(width, -length * 0.32, width * 0.8, -length * 0.78, 0, -length);
  ctx.bezierCurveTo(-width * 0.8, -length * 0.78, -width, -length * 0.32, 0, 0);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.7;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -length * 0.08);
  ctx.quadraticCurveTo(width * 0.15, -length * 0.45, 0, -length * 0.9);
  ctx.strokeStyle = 'rgba(236, 242, 233, 0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

function bloom(ctx: Ctx, cx: number, cy: number, radius: number, turn: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(turn);

  const outer = 12;
  for (let i = 0; i < outer; i += 1) {
    const angle = (i / outer) * Math.PI * 2;
    petal(
      ctx,
      radius * (0.9 + (i % 3) * 0.045),
      radius * 0.34,
      i % 2 === 0 ? DEEP : MID,
      2.1,
      angle,
    );
  }

  const middle = 8;
  ctx.rotate(0.16);
  for (let i = 0; i < middle; i += 1) {
    const angle = (i / middle) * Math.PI * 2;
    petal(ctx, radius * 0.55, radius * 0.26, i % 2 === 0 ? PALE : CREAM, 1.5, angle);
  }

  // Fine petal veins give the motif the softness of a painted / carved glaze.
  ctx.save();
  for (let i = 0; i < outer; i += 1) {
    ctx.save();
    ctx.rotate((i / outer) * Math.PI * 2);
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.22);
    ctx.quadraticCurveTo(radius * 0.04, -radius * 0.48, 0, -radius * 0.76);
    ctx.strokeStyle = i % 2 === 0 ? HILITE : 'rgba(58, 87, 69, 0.35)';
    ctx.lineWidth = 1.1;
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(234, 235, 215, 0.88)';
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  for (let i = 0; i < 10; i += 1) {
    const angle = (i / 10) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * radius * 0.1, Math.sin(angle) * radius * 0.1, radius * 0.016, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(73, 101, 81, 0.8)';
    ctx.fill();
  }

  ctx.restore();
}

function bud(ctx: Ctx, x: number, y: number, size: number, turn: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(turn);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(size * 0.72, -size * 0.3, size * 0.42, -size * 0.9, 0, -size);
  ctx.bezierCurveTo(-size * 0.42, -size * 0.9, -size * 0.72, -size * 0.3, 0, 0);
  ctx.fillStyle = MID;
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.6;
  ctx.stroke();

  leaf(ctx, 0, -size * 0.2, size * 0.7, size * 0.17, -2.55, DEEP);
  leaf(ctx, 0, -size * 0.28, size * 0.62, size * 0.15, 2.35, DEEP);
  ctx.restore();
}

function curl(ctx: Ctx, x: number, y: number, scale: number, flip = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(flip, 1);
  ctx.beginPath();
  ctx.moveTo(-scale * 1.1, scale * 0.2);
  ctx.bezierCurveTo(-scale * 0.5, scale * 0.2, -scale * 0.2, -scale * 0.5, scale * 0.2, -scale * 0.45);
  ctx.bezierCurveTo(scale * 0.6, -scale * 0.42, scale * 0.7, -scale * 0.02, scale * 0.42, scale * 0.03);
  ctx.bezierCurveTo(scale * 0.25, scale * 0.06, scale * 0.19, -scale * 0.14, scale * 0.34, -scale * 0.2);
  ctx.strokeStyle = DEEP;
  ctx.lineWidth = 2.2;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();
}

function vine(ctx: Ctx, width: number, height: number) {
  ctx.save();
  ctx.lineCap = 'round';

  const stems = [
    [0.06, 0.57, 0.2, 0.35, 0.34, 0.66, 0.47, 0.5],
    [0.47, 0.5, 0.6, 0.34, 0.76, 0.64, 0.93, 0.5],
  ] as const;

  for (const [x0, y0, x1, y1, x2, y2, x3, y3] of stems) {
    ctx.beginPath();
    ctx.moveTo(x0 * width, y0 * height);
    ctx.bezierCurveTo(x1 * width, y1 * height, x2 * width, y2 * height, x3 * width, y3 * height);
    ctx.strokeStyle = 'rgba(61, 94, 75, 0.58)';
    ctx.lineWidth = 3.2;
    ctx.stroke();
  }

  const leaves: Array<[number, number, number, number, number]> = [
    [0.1, 0.58, 124, 0.3, -2.3],
    [0.18, 0.43, 105, 0.28, 2.6],
    [0.28, 0.61, 118, 0.3, -2.55],
    [0.58, 0.47, 112, 0.28, 2.35],
    [0.68, 0.6, 126, 0.32, -2.4],
    [0.79, 0.43, 112, 0.3, 2.7],
    [0.9, 0.58, 100, 0.27, -2.3],
  ];
  for (const [x, y, length, widthRatio, turn] of leaves) {
    const leafLength = length * (width / 2048);
    leaf(ctx, x * width, y * height, leafLength, leafLength * widthRatio, turn);
  }

  curl(ctx, width * 0.12, height * 0.32, width * 0.033, 1);
  curl(ctx, width * 0.87, height * 0.32, width * 0.033, -1);
  curl(ctx, width * 0.34, height * 0.71, width * 0.022, -1);

  ctx.restore();
}

function lotusBand(ctx: Ctx, width: number, height: number) {
  const tip = height * 0.69;
  const base = height * 0.83;
  const length = base - tip;
  const count = 22;
  const spacing = width / count;

  ctx.save();
  for (let i = 0; i < count; i += 1) {
    const x = spacing * (i + 0.5);
    ctx.save();
    ctx.translate(x, base);
    petal(ctx, length * 0.92, spacing * 0.34, i % 2 === 0 ? DEEP : MID, 1.5);
    ctx.beginPath();
    ctx.moveTo(0, -length * 0.28);
    ctx.quadraticCurveTo(spacing * 0.035, -length * 0.56, 0, -length * 0.8);
    ctx.strokeStyle = i % 2 === 0 ? HILITE : 'rgba(58, 87, 69, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  border(ctx, width, height, base + 18, 1);
  ctx.restore();
}

function border(ctx: Ctx, width: number, height: number, y: number, flip: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(57, 88, 70, 0.55)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(245, 247, 238, 0.54)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, y + 5 * flip);
  ctx.lineTo(width, y + 5 * flip);
  ctx.stroke();

  for (let x = 28; x < width - 20; x += 56) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 15, y - 9 * flip);
    ctx.lineTo(x + 30, y);
    ctx.strokeStyle = 'rgba(91, 125, 101, 0.42)';
    ctx.lineWidth = 1.1;
    ctx.stroke();
  }
  ctx.restore();
}

export function createFloralPatternTexture(renderer: THREE.WebGLRenderer, mobile = false): THREE.CanvasTexture {
  const width = mobile ? 1024 : 2048;
  const height = Math.round(width * 0.5);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2d canvas unavailable');

  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Fine framing rings read as carved borders at shoulder and foot.
  border(ctx, width, height, height * 0.08, -1);
  lotusBand(ctx, width, height);

  vine(ctx, width, height);

  // The large central bloom faces the camera when the decoration band is
  // turned half a revolution, so the first view is never an empty stretch.
  bloom(ctx, width * 0.5, height * 0.5, height * 0.175, 0.2);
  bloom(ctx, width * 0.245, height * 0.47, height * 0.112, -0.5);
  bloom(ctx, width * 0.755, height * 0.51, height * 0.12, 0.7);

  bud(ctx, width * 0.38, height * 0.66, height * 0.065, 0.15);
  bud(ctx, width * 0.63, height * 0.34, height * 0.058, -0.3);
  bud(ctx, width * 0.9, height * 0.66, height * 0.055, 0.32);
  bud(ctx, width * 0.1, height * 0.38, height * 0.05, -0.15);

  // A few dewdrop-like dots lift the pattern off the glaze without colour noise.
  const dots: Array<[number, number, number]> = [
    [0.31, 0.36, 2.3],
    [0.4, 0.58, 1.8],
    [0.57, 0.62, 2.1],
    [0.69, 0.4, 1.7],
    [0.23, 0.62, 1.6],
    [0.79, 0.63, 1.9],
  ];
  for (const [x, y, radius] of dots) {
    ctx.beginPath();
    ctx.arc(width * x, height * y, radius * (width / 2048), 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(249, 250, 240, 0.78)';
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  texture.needsUpdate = true;
  return texture;
}
