import { Card } from "../Card/Card";
import css from "./MoviesList.module.css";

export const MoviesList = () => {
  return (
    <section className={`${css.MoviesList} grid`}>
      <ul className={css.wrapper}>
        <li className={css.item}>
          <Card
            image="/images/chihiro043.jpg"
            heading="Chihiro"
            url="#Chihiro"
          />
        </li>

        <li className={`${css.item} ${css.itemBleed}`}>
          <Card image="/images/totoro030.jpg" heading="Totoro" url="#totoro" />
        </li>

        <li className={css.item}>
          <Card
            image="/images/mononoke023.jpg"
            heading="Princess Mononoke"
            url="#Mononoke"
          />
        </li>
      </ul>
    </section>
  );
};
