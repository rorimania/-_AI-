export interface ProfilePoint {
  /** Normalized height, 0 = foot, 1 = rim. */
  y: number;
  /** Normalized radius. */
  r: number;
}

export const MIN_RADIUS = 0.035;
export const MAX_RADIUS = 0.49;

/** A meiping-like silhouette. Fixed heights, editable radii. */
export const defaultProfile: ProfilePoint[] = [
  { y: 0.0, r: 0.3 },
  { y: 0.035, r: 0.315 },
  { y: 0.12, r: 0.36 },
  { y: 0.28, r: 0.44 },
  { y: 0.42, r: 0.46 },
  { y: 0.56, r: 0.425 },
  { y: 0.68, r: 0.35 },
  { y: 0.78, r: 0.24 },
  { y: 0.86, r: 0.145 },
  { y: 0.93, r: 0.112 },
  { y: 1.0, r: 0.118 },
];

export interface ProfilePreset {
  id: string;
  label: string;
  note: string;
  profile: ProfilePoint[];
}

export const PROFILE_PRESETS: ProfilePreset[] = [
  {
    id: 'meiping',
    label: '梅瓶',
    note: '丰肩，修长',
    profile: defaultProfile,
  },
  {
    id: 'yuhuchun',
    label: '玉壶春',
    note: '撇口，垂腹',
    profile: [
      { y: 0.0, r: 0.215 },
      { y: 0.035, r: 0.225 },
      { y: 0.1, r: 0.255 },
      { y: 0.22, r: 0.35 },
      { y: 0.34, r: 0.425 },
      { y: 0.44, r: 0.445 },
      { y: 0.54, r: 0.415 },
      { y: 0.64, r: 0.335 },
      { y: 0.73, r: 0.205 },
      { y: 0.8, r: 0.13 },
      { y: 0.87, r: 0.108 },
      { y: 0.94, r: 0.132 },
      { y: 1.0, r: 0.185 },
    ],
  },
  {
    id: 'jar',
    label: '罐',
    note: '圆肩，饱满',
    profile: [
      { y: 0.0, r: 0.3 },
      { y: 0.035, r: 0.315 },
      { y: 0.1, r: 0.356 },
      { y: 0.23, r: 0.415 },
      { y: 0.38, r: 0.458 },
      { y: 0.5, r: 0.47 },
      { y: 0.61, r: 0.442 },
      { y: 0.71, r: 0.372 },
      { y: 0.79, r: 0.288 },
      { y: 0.86, r: 0.228 },
      { y: 0.92, r: 0.202 },
      { y: 0.96, r: 0.218 },
      { y: 1.0, r: 0.236 },
    ],
  },
];

export const PROFILE_PRESET_BY_ID = Object.fromEntries(
  PROFILE_PRESETS.map((preset) => [preset.id, preset]),
) as Record<string, ProfilePreset>;

export const PART_RANGES = {
  mouth: [0.875, 1.0],
  neck: [0.775, 0.875],
  shoulder: [0.6, 0.775],
  belly: [0.18, 0.6],
  foot: [0.0, 0.18],
} as const;

export type PartId = keyof typeof PART_RANGES;

export const PART_ORDER: PartId[] = ['mouth', 'neck', 'shoulder', 'belly', 'foot'];

export const PART_LABELS: Record<PartId, { zh: string; en: string; num: string }> = {
  mouth: { zh: '瓶口', en: 'Mouth', num: '01' },
  neck: { zh: '瓶颈', en: 'Neck', num: '02' },
  shoulder: { zh: '瓶肩', en: 'Shoulder', num: '03' },
  belly: { zh: '瓶腹', en: 'Belly', num: '04' },
  foot: { zh: '瓶底 · 圈足', en: 'Foot', num: '05' },
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function clampProfile(points: ProfilePoint[]): ProfilePoint[] {
  return points.map((point) => ({
    y: clamp(point.y, 0, 1),
    r: clamp(point.r, MIN_RADIUS, MAX_RADIUS),
  }));
}

/**
 * Catmull-Rom tangents in Hermite form. The profile is a single-valued
 * radius function of height, which keeps the lathe from folding over.
 */
function tangents(points: ProfilePoint[]): number[] {
  const result = new Array<number>(points.length);
  for (let i = 0; i < points.length; i += 1) {
    if (i === 0) {
      result[i] = (points[1].r - points[0].r) / Math.max(1e-5, points[1].y - points[0].y);
    } else if (i === points.length - 1) {
      result[i] =
        (points[i].r - points[i - 1].r) / Math.max(1e-5, points[i].y - points[i - 1].y);
    } else {
      result[i] =
        (points[i + 1].r - points[i - 1].r) /
        Math.max(1e-5, points[i + 1].y - points[i - 1].y);
    }
  }
  return result;
}

export function radiusAt(points: ProfilePoint[], y: number): number {
  const sorted = points;
  if (y <= sorted[0].y) return clamp(sorted[0].r, MIN_RADIUS, MAX_RADIUS);
  if (y >= sorted[sorted.length - 1].y) {
    return clamp(sorted[sorted.length - 1].r, MIN_RADIUS, MAX_RADIUS);
  }

  const slopes = tangents(sorted);

  for (let i = 0; i < sorted.length - 1; i += 1) {
    const a = sorted[i];
    const b = sorted[i + 1];
    if (y < a.y || y > b.y) continue;

    const dy = b.y - a.y;
    const t = (y - a.y) / dy;
    const t2 = t * t;
    const t3 = t2 * t;
    const h00 = 2 * t3 - 3 * t2 + 1;
    const h10 = t3 - 2 * t2 + t;
    const h01 = -2 * t3 + 3 * t2;
    const h11 = t3 - t2;
    const r =
      h00 * a.r +
      h10 * dy * slopes[i] +
      h01 * b.r +
      h11 * dy * slopes[i + 1];
    return clamp(r, MIN_RADIUS, MAX_RADIUS);
  }

  return clamp(sorted[sorted.length - 1].r, MIN_RADIUS, MAX_RADIUS);
}

export function sampleProfile(points: ProfilePoint[], count = 160): ProfilePoint[] {
  const result: ProfilePoint[] = [];
  for (let i = 0; i < count; i += 1) {
    const y = i / (count - 1);
    result.push({ y, r: radiusAt(points, y) });
  }
  return result;
}

export function sampleBand(
  points: ProfilePoint[],
  y0: number,
  y1: number,
  count = 60,
): ProfilePoint[] {
  const result: ProfilePoint[] = [];
  for (let i = 0; i < count; i += 1) {
    const y = y0 + ((y1 - y0) * i) / (count - 1);
    result.push({ y, r: radiusAt(points, y) });
  }
  return result;
}

/**
 * Builds a closed hollow shell in profile order:
 * outer bottom centre → foot → outer wall → rim lip → inner wall → inner floor.
 */
export function buildShellProfile(points: ProfilePoint[]): ProfilePoint[] {
  const outer = sampleProfile(points, 176);
  const footRadius = outer[0].r;
  const rimRadius = outer[outer.length - 1].r;
  const lipThickness = 0.019;
  const innerBottomY = 0.065;
  const wallAt = (y: number) => 0.017 + 0.033 * Math.pow(1 - y, 1.15);

  const shell: ProfilePoint[] = [
    { y: 0.018, r: 0 },
    { y: 0.018, r: footRadius * 0.52 },
    { y: 0.0, r: footRadius * 0.78 },
    { y: 0.0, r: footRadius },
  ];

  for (let i = 1; i < outer.length; i += 1) {
    shell.push(outer[i]);
  }

  // Rim: a small flat lip instead of an infinitely thin edge.
  shell.push({ y: 1.006, r: rimRadius - lipThickness * 0.5 });
  shell.push({ y: 1.002, r: rimRadius - lipThickness });

  // Inner wall, top to bottom.
  const innerSegments = 108;
  for (let i = innerSegments; i >= 0; i -= 1) {
    const y = innerBottomY + ((0.982 - innerBottomY) * i) / innerSegments;
    const radius = Math.max(0.0035, radiusAt(points, y) - wallAt(y));
    shell.push({ y, r: radius });
  }

  // Inner floor back to the axis.
  shell.push({ y: innerBottomY, r: 0.0035 });
  shell.push({ y: innerBottomY, r: 0 });

  return shell;
}

/** A standalone outer-wall band, used for the scroll focus highlight. */
export function buildBandProfile(
  points: ProfilePoint[],
  range: readonly [number, number],
): ProfilePoint[] {
  return sampleBand(points, range[0], range[1], 56);
}
