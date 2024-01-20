import BarcodeComponent from "../Barcode/barcode";
import "./hero_card.css";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export interface HeroCardInterface {
  linkImage?: string;
  name: string;
  description?: string;
  team?: string;
  id?: string;
  UUID?: string;
  isHero?: boolean;
  tag?: string | null;
  canModificate? : boolean,
  planetLocationId?:number,
}

export const HeroCard: React.FC<HeroCardInterface> = ({
  linkImage,
  name,
  team,
  description,
  id,
  UUID,
  isHero,
  tag,
}) => {
  const [getUrl, setGetUrl] = useState("");
  const [putUrl, setPutUrl] = useState("");
  const [delUrl, setDelUrl] = useState("");
  useEffect(() => {
    switch (tag) {
      case "All Cities":
        setGetUrl("getOneCity");
        setPutUrl("updateCity");
        setDelUrl("city");
        break;
      case "All vehicles":
        setGetUrl("getOneVehicle");
        setPutUrl("updateVehicle");
        setDelUrl("vehicle");
        break;
      case "All Powers":
        setGetUrl("getOnePower");
        setPutUrl("updatePower");
        setDelUrl("power");
        break;
      case "All Planets":
        setGetUrl("getOnePlannet");
        setPutUrl("updatePlannets");
        setDelUrl("plannet");
        break;
      case "All gadgets":
        setGetUrl("getOneGadget");
        setPutUrl("updateGadget");
        setDelUrl("gadget");
        break;
    }
  }, [tag]);

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
            <h5>{(team || description) ?? "No Team"}</h5>
            <span className="separation"></span>
            <i className="i3" />
            <article className="rowContainer container_id_herocard">
              <p className="id_title_herocard">Id</p>
              <p className="id_herocard">{id}</p>
            </article>
            <i className="i4" />
            <BarcodeComponent value={id || UUID || ""} width={66} height={20} />
            <span className="corner_styled"></span>
          </div>
        </Link>
      ) : (
        getUrl &&
        putUrl &&
        delUrl && (
          <Link
            to={`/edit-extra/${id}?getUrl=${encodeURIComponent(
              getUrl
            )}&putUrl=${encodeURIComponent(
              putUrl
            )}&delUrl=${encodeURIComponent(delUrl)}`}
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
              <BarcodeComponent
                value={id || UUID || ""}
                width={66}
                height={20}
              />
              <span className="corner_styled"></span>
            </div>
          </Link>
        )
      )}
    </>
  );
};
