import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Sizes, type useExperienceProps } from "./Experience.types";
import { getFov, SceneDirector } from "./utils";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";

export const useExperience = ({
  renderer,
  camera,
}: Partial<useExperienceProps>) => {
  const { globalRefs } = useGlobalRefs();

  const sizes = useRef<Sizes>({} as Sizes);
  const [meshes, setMeshes] = useState<THREE.Mesh[] | null>(null);

  // Calculating the FOV for the Perspective camera
  //https://github.com/mrdoob/three.js/issues/1239

  const positionZ = 100;
  const fov = getFov(sizes.current.height, positionZ);

  const cameraSettings = {
    fov: fov,
    near: 0.01,
    far: 1000,
    position: new THREE.Vector3(0, 0, positionZ),
  };

  useEffect(() => {
    if (!globalRefs) return;

    const sceneDirector = new SceneDirector(globalRefs, true);
    sceneDirector.init();

    setMeshes(sceneDirector.getMeshes());
  }, [globalRefs]);

  useEffect(() => {
    if (!window || !window.innerWidth || !window.innerHeight) return;

    sizes.current = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    };
  }, []);

  useEffect(() => {
    if (!renderer || !camera) return;

    const handleResize = () => {
      sizes.current = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      };

      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = getFov(sizes.current.height, positionZ);
        camera.aspect = sizes.current.width / sizes.current.height;
      }

      camera.updateProjectionMatrix();

      renderer.setSize(sizes.current.width, sizes.current.height);
      renderer.setPixelRatio(sizes.current.pixelRatio);
    };

    window.addEventListener("resize", handleResize);

    console.log("Lenny en use effect");

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera, renderer]);

  return {
    sizes: sizes.current,
    cameraSettings,
    meshes,
  };
};
