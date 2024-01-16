import { useEffect, useState } from "react";
import NavigationBar from "../../components/Nav/nav";
import { HeroCard, HeroCardInterface } from "../../components/HeroCard/hero_card";
import "./single_hero_page.css";
import "../../styles/index.css";

interface PowersProps {
  name: string;
}

interface GadgetsProps {
  name: string;
}

interface VehicleProps {
  name: string;
}

interface PlanetProps {
  name: string;
  image: string;
}

interface HeroDatasProps {
  image: string;
  name: string;
  desc: string;
  heroName: string;
  sexe: string;
  hairColor: string;
  city: string;
  powers: Array<PowersProps>;
  gadgets: Array<GadgetsProps>;
  team: Array<HeroCardInterface>;
  vehicle: VehicleProps;
  originPlanet: PlanetProps;
}

const SingleHeroPage = () => {
  const [idHero, setIdHero] = useState("");
  const [heroDatas, setHeroDatas] = useState<HeroDatasProps>();

  useEffect(() => {
    const path = document.location.href.split("/");
    setIdHero(path[path.length - 1]);
  }, []);

  return (
    <>
      <NavigationBar />
      <main className="columnContainer">
        <header className="columnContainer">
          <h1>{heroDatas?.heroName ?? "Undefined"}</h1>
          <h5>{heroDatas?.desc ?? "Undefined"}</h5>
        </header>
        <section className="columnContainer">
          <div className="columnContainer">
            <h2>Profile</h2>
            <span></span>
          </div>
          <article className="rowContainer">
            <img src={heroDatas?.image ?? ""} alt="hero_image" />
            <div className="columnContainer">
              <div className="rowContainer">
                <h5>Nom :</h5>
                <p>{heroDatas?.name ?? "Undefined"}</p>
              </div>
              <div className="rowContainer">
                <h5>Sexe :</h5>
                <p>{heroDatas?.sexe ?? "Undefined"}</p>
              </div>
              <div className="rowContainer">
                <h5>Couleur de cheveux :</h5>
                <p>{heroDatas?.hairColor ?? "Undefined"}</p>
              </div>
              <div className="rowContainer">
                <h5>Ville protégée :</h5>
                <p>{heroDatas?.city ?? "Undefined"}</p>
              </div>
              <div className="rowContainer">
                <h5>Ville protégée :</h5>
                <p>{heroDatas?.city ?? "Undefined"}</p>
              </div>
              <div className="rowContainer">
                <h5>Ville protégée :</h5>
                <p>{heroDatas?.city ?? "Undefined"}</p>
              </div>
            </div>
          </article>
        </section>
        <section className="columnContainer">
          <div className="columnContainer">
            <h2>Team</h2>
            <span></span>
          </div>
          <article>
            {heroDatas?.team.map((teamMember , index:number)=> (
                <HeroCard key={index} id={teamMember.id} image={teamMember.image} name={teamMember.name} team={teamMember.team}/>
            ))}
          </article>
        </section>
      </main>
    </>
  );
};

export default SingleHeroPage;
