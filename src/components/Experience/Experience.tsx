import { useExperience } from "./Experience.hook";
import css from "./Experience.module.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

export const ExperienceWrapper = () => {
  const { cameraSettings } = useExperience({});

  return (
    <Canvas
      className={css.Experience}
      camera={{
        fov: cameraSettings.fov,
        near: cameraSettings.near,
        far: cameraSettings.far,
        position: cameraSettings.position,
      }}
    >
      <Experience />
    </Canvas>
  );
};

export const Experience = () => {
  const { gl, camera } = useThree(({ gl, camera }) => ({ gl, camera }));

  const { meshes } = useExperience({
    renderer: gl,
    camera,
  });

  useFrame(() => {
    if (!meshes) return;

    meshes.forEach((mesh) => {
      const { left, top, width, height } =
        mesh.userData.htmlElement.getBoundingClientRect();

      mesh.position.set(
        left - document.body.offsetWidth / 2 + width / 2,
        -top + window.innerHeight / 2 - height / 2,
        0
      );
    });
  });

  return (
    <>
      {meshes?.map((mesh) => {
        return <primitive object={mesh} key={mesh.uuid} />;
      })}
    </>
  );
};
