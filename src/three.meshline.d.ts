declare module "three.meshline" {
  import { Geometry, Material, Vector3, BufferGeometry, Line } from "three";

  export class MeshLine extends Geometry {
    constructor();
    setPoints(points: Vector3[]): void;
  }

  export class MeshLineMaterial extends Material {
    constructor(parameters?: {
      color?: number | string;
      lineWidth?: number;
      sizeAttenuation?: boolean;
      resolution?: Vector3;
      dashArray?: number;
      dashOffset?: number;
      dashRatio?: number;
      useMap?: boolean;
      alphaTest?: number;
      opacity?: number;
    });
  }
}
