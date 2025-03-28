import { useEffect, useRef } from "react";
import { useGlobalRefs } from "../../hooks/useGlobalRefs";
import { GLElementsEnum } from "../Experience";
import css from "./Card.module.css";

export type CardProps = {
  image: string;
  heading: string;
  url?: string;
  className?: string;
};

export const Card = ({ image, heading, url, className }: CardProps) => {
  const { setRef } = useGlobalRefs();

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (cardRef.current) setRef(cardRef);
    if (imageRef.current) setRef(imageRef);
    if (headingRef.current) setRef(headingRef);
  }, [setRef]);

  return (
    <div
      ref={cardRef}
      className={`${css.Card} ${className && className}`}
      style={
        {
          "--bg-card": `url(${image})`,
        } as React.CSSProperties
      }
      data-gl={GLElementsEnum.BLOCK}
    >
      <img
        ref={imageRef}
        className={css.image}
        src={image}
        alt={heading}
        data-gl={GLElementsEnum.IMAGE}
      />
      <div className={css.cardContent}>
        <h2
          ref={headingRef}
          className={css.heading}
          data-gl={GLElementsEnum.TEXT}
        >
          {heading}
        </h2>
        {url && (
          <a href={url} className={css.link}>
            Go to {heading}
          </a>
        )}
      </div>
    </div>
  );
};
