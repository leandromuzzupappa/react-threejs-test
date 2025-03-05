import css from "./Card.module.css";

export type CardProps = {
  image: string;
  heading: string;
  url?: string;
  className?: string;
};

export const Card = ({ image, heading, url, className }: CardProps) => {
  return (
    <div
      className={`${css.Card} ${className && className}`}
      style={
        {
          "--bg-card": `url(${image})`,
        } as React.CSSProperties
      }
    >
      <img className={css.image} src={image} alt={heading} />
      <div className={css.cardContent}>
        <h2 className={css.heading}>{heading}</h2>
        {url && (
          <a href={url} className={css.link}>
            Go to {heading}
          </a>
        )}
      </div>
    </div>
  );
};
