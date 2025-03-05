import { WebGLRenderer } from "three";
import { Camera } from "@react-three/fiber";

export type useExperienceProps = {
  renderer: WebGLRenderer;
  camera: Camera;
};

export type Sizes = {
  width: number;
  height: number;
  pixelRatio: number;
};

export enum GLElementsEnum {
  BLOCK = "gl-block",
  IMAGE = "gl-image",
  TEXT = "gl-text",
}
