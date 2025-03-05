import * as THREE from "three";
import { GLElementsEnum } from "../Experience.types";
import { getElementProperties } from "./getElementProperties";

import { fragmentShader, vertexShader } from "../../../shaders/baseMaterial";
import { fragmentShader as imageFs } from "../../../shaders/baseImageMaterial";

export class SceneDirector {
  public hideElements = false;

  public allElements: HTMLElement[] = [];
  public allMeshes: THREE.Mesh[] = [];
  public allTextMeshes: THREE.Mesh[] = [];

  public materialCache: Map<string, THREE.ShaderMaterial> = new Map();

  public textureLoader = new THREE.TextureLoader();

  public geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
  public baseMaterial = new THREE.ShaderMaterial({
    vertexShader,
    uniforms: {
      uVelocity: new THREE.Uniform(0),
      uTime: new THREE.Uniform(0),
    },
  });

  constructor(elements: HTMLElement[], hideElements = false) {
    this.hideElements = hideElements;
    this.allElements = elements;
  }

  public getBlockMaterial = (element: HTMLElement): THREE.ShaderMaterial => {
    const { backgroundColor } = getElementProperties(element);

    console.log("Lenny background material", backgroundColor);

    let material = this.materialCache.get(`block-${backgroundColor}`);

    if (!material) {
      const clonedMaterial = this.baseMaterial.clone();
      clonedMaterial.fragmentShader = fragmentShader;
      clonedMaterial.uniforms.uColor = new THREE.Uniform(
        new THREE.Color(backgroundColor).toArray()
      );

      // this.materialCache.set(`block-${backgroundColor}`, clonedMaterial);
      this.materialCache.set(`block-${backgroundColor}`, clonedMaterial);
      material = clonedMaterial;
    }

    return material;
  };

  public getImageMaterial = (
    element: HTMLImageElement
  ): THREE.ShaderMaterial => {
    let material = this.materialCache.get(element.src);

    if (!material) {
      const clonedMaterial = this.baseMaterial.clone();
      clonedMaterial.fragmentShader = imageFs;
      clonedMaterial.uniforms.uTexture = new THREE.Uniform(
        this.textureLoader.load(element.src)
      );

      this.materialCache.set(element.src, clonedMaterial);
      material = clonedMaterial;
    }

    return material;
  };

  public getTextMaterial = (element: HTMLElement): THREE.ShaderMaterial => {
    // const { color } = getElementProperties(element);
    const { color } = getElementProperties(element);

    let material = this.materialCache.get(`text-${color}`);
    if (!material) {
      const clonedMaterial = this.baseMaterial.clone();
      clonedMaterial.fragmentShader = fragmentShader;
      clonedMaterial.vertexShader = vertexShader;
      clonedMaterial.uniforms.uColor = new THREE.Uniform(
        new THREE.Color(color).toArray()
      );

      this.materialCache.set(`text-${color}`, clonedMaterial);
      material = clonedMaterial;
    }

    return material;
  };

  public createMesh = (element: HTMLElement): THREE.Mesh => {
    const elementType = element.dataset.gl;
    const { width, height } = element.getBoundingClientRect();

    let material;

    if (elementType === GLElementsEnum.BLOCK) {
      material = this.getBlockMaterial(element as HTMLDivElement);
    }

    if (elementType === GLElementsEnum.TEXT) {
      material = this.getTextMaterial(element);
    }

    if (elementType === GLElementsEnum.IMAGE) {
      material = this.getImageMaterial(element as HTMLImageElement);
    }

    const mesh = new THREE.Mesh(this.geometry, material);
    mesh.scale.set(width, height, 1);
    mesh.userData.htmlElement = element;

    return mesh;
  };

  public init = (): void => {
    this.allElements.forEach((element) => {
      // [TODO] definir como separar entre texto y bloques o imagenes

      const obj = this.createMesh(element);
      this.allMeshes.push(obj);

      if (this.hideElements) {
        element.style.opacity = "0";
      }
    });
  };

  public getMeshes = (): THREE.Mesh[] => {
    return this.allMeshes;
  };
}
