import * as THREE from "three";
import { GLElementsEnum } from "../Experience.types";
import { getElementProperties } from "./getElementProperties";

import { fragmentShader, vertexShader } from "../../../shaders/baseMaterial";
import { fragmentShader as imageFs } from "../../../shaders/baseImageMaterial";
import { vertexShader as textVs } from "../../../shaders/baseTextMaterial";
import { Text } from "troika-three-text";
import { MeshShaderMaterial } from "../../../types";

export class SceneDirector {
  public hideElements = false;

  public allElements: HTMLElement[] = [];
  public allMeshes: MeshShaderMaterial[] = [];
  public allTextMeshes: THREE.Group[] = [];

  public materialCache: Map<string, THREE.ShaderMaterial> = new Map();

  public textureLoader = new THREE.TextureLoader();

  public geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
  public baseMaterial = new THREE.ShaderMaterial({
    vertexShader,
    uniforms: {
      uVelocity: new THREE.Uniform(0),
      uTime: new THREE.Uniform(0),
      uOpacity: new THREE.Uniform(1),
      uRadius: new THREE.Uniform(0),
    },
  });

  constructor(elements: HTMLElement[], hideElements = false) {
    this.hideElements = hideElements;
    this.allElements = elements;

    console.log("{{ SceneDirector constructor }}", this.allElements);
  }

  public getBlockMaterial = (element: HTMLElement): THREE.ShaderMaterial => {
    const { backgroundColor, isTransparent } = getElementProperties(element);

    let material = this.materialCache.get(`block-${backgroundColor}`);

    if (!material) {
      const clonedMaterial = this.baseMaterial.clone();
      clonedMaterial.fragmentShader = fragmentShader;
      clonedMaterial.uniforms.uColor = new THREE.Uniform(
        new THREE.Color(backgroundColor).toArray()
      );

      if (isTransparent)
        clonedMaterial.uniforms.uOpacity = new THREE.Uniform(0);

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
    const { color } = getElementProperties(element);

    let material = this.materialCache.get(`text-${color}`);
    if (!material) {
      const clonedMaterial = this.baseMaterial.clone();
      clonedMaterial.fragmentShader = fragmentShader;
      clonedMaterial.vertexShader = textVs;
      clonedMaterial.uniforms.uColor = new THREE.Uniform(
        new THREE.Color(color).toArray()
      );

      this.materialCache.set(`text-${color}`, clonedMaterial);
      material = clonedMaterial;
    }

    return material;
  };

  public createMesh = (element: HTMLElement): MeshShaderMaterial => {
    const elementType = element.dataset.gl;
    const { width, height } = element.getBoundingClientRect();

    let material;

    if (elementType === GLElementsEnum.BLOCK) {
      material = this.getBlockMaterial(element as HTMLDivElement);
    }

    if (elementType === GLElementsEnum.IMAGE) {
      material = this.getImageMaterial(element as HTMLImageElement);
    }

    if (elementType === GLElementsEnum.TEXT) {
      material = this.getTextMaterial(element);

      const textMesh = new Text();
      const { fontFamily, fontSize } = getElementProperties(element);

      textMesh.text = element.textContent!;
      textMesh.fontSize = fontSize;
      textMesh.font = fontFamily;
      textMesh.anchorX = "center";
      textMesh.anchorY = "50%";
      textMesh.textAlign = "left";
      textMesh.material = material;
      textMesh.sync();

      const group = new THREE.Group();
      group.add(textMesh as unknown as THREE.Mesh);
      group.userData.htmlElement = element;

      this.allTextMeshes.push(group);
      return group as unknown as MeshShaderMaterial;
    }

    const mesh = new THREE.Mesh(this.geometry, material);
    mesh.scale.set(width, height, 1);
    mesh.userData.htmlElement = element;

    return mesh;
  };

  public init = (): void => {
    this.allElements.forEach((element) => {
      const obj = this.createMesh(element);
      this.allMeshes.push(obj);

      if (this.hideElements) {
        element.style.opacity = "0.2";
      }
    });

    this.updatePlanesPosition(this.allMeshes);
    this.updateTexts2DPosition(this.allTextMeshes);
  };

  public getMeshes = (): THREE.Mesh[] => {
    return this.allMeshes;
  };

  public updatePlanesPosition = (
    planes: MeshShaderMaterial[] | THREE.Group[]
  ) => {
    planes.forEach((plane) => {
      const { left, top, width, height } =
        plane.userData.htmlElement.getBoundingClientRect();

      plane.position.set(
        left - document.body.offsetWidth / 2 + width / 2,
        -top + window.innerHeight / 2 - height / 2,
        0
      );
    });
  };

  public updateTexts2DPosition = (planes: THREE.Group[]) => {
    planes.forEach((plane) => {
      const { left, top } = plane.userData.htmlElement.getBoundingClientRect();
      plane.position.set(
        left - document.body.offsetWidth / 2,
        -top + window.innerHeight / 2,
        0
      );
    });
  };

  public tick = (elapsedTime: number): void => {
    this.materialCache.forEach((material) => {
      if (material.uniforms.uTime) {
        material.uniforms.uTime.value = elapsedTime;
      }
    });

    this.updatePlanesPosition(this.allMeshes);
    this.updateTexts2DPosition(this.allTextMeshes);
  };
}
