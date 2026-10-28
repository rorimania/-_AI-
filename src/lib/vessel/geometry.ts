import * as THREE from 'three';
import {
  PART_ORDER,
  PART_RANGES,
  buildBandProfile,
  buildShellProfile,
  radiusAt,
  type PartId,
  type ProfilePoint,
} from './profile';

export interface VesselDimensions {
  height: number;
  radiusScale: number;
  radialSegments: number;
}

export const defaultDimensions: VesselDimensions = {
  height: 2.4,
  radiusScale: 1.45,
  radialSegments: 128,
};

function toVectors(points: ProfilePoint[], dimensions: VesselDimensions): THREE.Vector2[] {
  return points.map(
    (point) =>
      new THREE.Vector2(
        point.r * dimensions.radiusScale,
        (point.y - 0.5) * dimensions.height,
      ),
  );
}

export function resolveDimensions(partial: Partial<VesselDimensions> = {}): VesselDimensions {
  return { ...defaultDimensions, ...partial };
}

export function createVesselGeometry(
  points: ProfilePoint[],
  partial: Partial<VesselDimensions> = {},
): THREE.BufferGeometry {
  const dimensions = resolveDimensions(partial);
  const shell = buildShellProfile(points);
  const geometry = new THREE.LatheGeometry(
    toVectors(shell, dimensions),
    dimensions.radialSegments,
    0,
    Math.PI * 2,
  );
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

export function createPartBandGeometries(
  points: ProfilePoint[],
  partial: Partial<VesselDimensions> = {},
): Record<PartId, THREE.BufferGeometry> {
  const dimensions = resolveDimensions(partial);
  const result = {} as Record<PartId, THREE.BufferGeometry>;

  for (const part of PART_ORDER) {
    const band = buildBandProfile(points, PART_RANGES[part]);
    const geometry = new THREE.LatheGeometry(
      toVectors(band, dimensions),
      dimensions.radialSegments,
      0,
      Math.PI * 2,
    );
    geometry.computeVertexNormals();
    result[part] = geometry;
  }

  return result;
}


export const PART_BOUNDARIES: Array<{ y: number; parts: PartId[] }> = [
  { y: 0, parts: ['foot'] },
  { y: 0.18, parts: ['foot', 'belly'] },
  { y: 0.6, parts: ['belly', 'shoulder'] },
  { y: 0.775, parts: ['shoulder', 'neck'] },
  { y: 0.875, parts: ['neck', 'mouth'] },
  { y: 1, parts: ['mouth'] },
];

export function createBoundaryRingGeometry(
  points: ProfilePoint[],
  y: number,
  partial: Partial<VesselDimensions> = {},
  segments = 180,
): THREE.BufferGeometry {
  const dimensions = resolveDimensions(partial);
  const radius = radiusAt(points, y) * dimensions.radiusScale * 1.0045;
  const height = (y - 0.5) * dimensions.height;
  const positions: number[] = [];

  for (let i = 0; i < segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2;
    positions.push(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}
