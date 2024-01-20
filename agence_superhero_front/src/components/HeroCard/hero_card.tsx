import BarcodeComponent from "../Barcode/barcode";
import "./hero_card.css";
import "../../styles/index.css";
import { Link } from "react-router-dom";

export interface HeroCardInterface {
  linkImage?: string;
  name: string;
  description?: string;
  team?: string;
  id?: string;
  UUID?:string;
  isHero?: boolean;
}

export const HeroCard: React.FC<HeroCardInterface> = ({
  linkImage,
  name,
  team,
  description,
  id,
  UUID,
  isHero,
}) => {
  return (
    <>
      {isHero ? (
        <Link
          to={"/single-hero/" + UUID}
          className="columnContainer container_hero_card"
        >
          <img src={linkImage ?? "/no_image.png"} alt="" />
          <div className="container_content_hero_card columnContainer">
            <i className="i1" />
            <h2>{name}</h2>
            <i className="i2" />
            <h5>{(team || description) ?? "Undefined"}</h5>
            <span className="separation"></span>
            <i className="i3" />
            <article className="rowContainer container_id_herocard">
              <p className="id_title_herocard">Id</p>
              <p className="id_herocard">{id}</p>
            </article>
            <i className="i4" />
            <BarcodeComponent value={id || UUID ||""} width={66} height={20} />
            <span className="corner_styled"></span>
          </div>
        </Link>
      ) : (
        <div className="columnContainer container_hero_card">
          <img src={linkImage ?? "/no_image.png"} alt="" />
          <div className="container_content_hero_card columnContainer">
            <i className="i1" />
            <h2>{name}</h2>
            <i className="i2" />
            <h5>{(team || description) ?? "Undefined"}</h5>
            <span className="separation"></span>
            <i className="i3" />
            <article className="rowContainer container_id_herocard">
              <p className="id_title_herocard">Id</p>
              <p className="id_herocard">{id}</p>
            </article>
            <i className="i4" />
            <BarcodeComponent value={id || UUID ||""} width={66} height={20} />
            <span className="corner_styled"></span>
          </div>
        </div>
      )}
    </>
  );
};
