import { useEffect, useRef } from "react";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import css from "./Hero.module.css";
import { GLElementsEnum } from "../Experience";
import gsap from "gsap";

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);

  const { setRef } = useGlobalRefs();

  useEffect(() => {
    if (heroRef.current) setRef(heroRef);
    if (heroImageRef.current) setRef(heroImageRef);
    // if (heroHeadingRef.current) setRef(heroHeadingRef);
  }, [setRef]);

  return (
    <section
      ref={heroRef}
      className={`${css.Hero} grid`}
      data-gl={GLElementsEnum.BLOCK}
    >
      <h1 ref={heroHeadingRef} data-gl={GLElementsEnum.TEXT}>
        Ghibli Web GL
      </h1>
      <img
        ref={heroImageRef}
        src="/images/howl016.jpg"
        alt=""
        data-gl={GLElementsEnum.IMAGE}
      />
    </section>
  );
};
