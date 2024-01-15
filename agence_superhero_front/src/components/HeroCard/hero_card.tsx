import BarcodeComponent from "../Barcode/barcode";
import "./hero_card.css";
import "../../styles/index.css";

export interface HeroCardInterface {
  image: string;
  name: string;
  team?: string;
  id: string;
}

export const HeroCard: React.FC<HeroCardInterface> = ({
  image,
  name,
  team,
  id,
}) => {
  return (
    <section className="columnContainer container_hero_card">
      <img src={image ?? ""} alt="" />
      <div className="container_content_hero_card columnContainer">
        <i className="i1" />
        <h2>{name}</h2>
        <i className="i2" />
        <h5>{team ?? "No team"}</h5>
        <span className="separation"></span>
        <i className="i3" />
        <article className="rowContainer container_id_herocard">
          <p className="id_title_herocard">Id</p>
          <p className="id_herocard">{id}</p>
        </article>
        <i className="i4" />
        <BarcodeComponent value={id} width={66} height={20} />
        <span className="corner_styled"></span>
      </div>
    </section>
  );
};
