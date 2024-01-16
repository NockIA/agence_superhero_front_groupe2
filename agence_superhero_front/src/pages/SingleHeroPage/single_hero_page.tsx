import { useEffect, useState } from "react";
import NavigationBar from "../../components/Nav/nav";
import {
  HeroCard,
  HeroCardInterface,
} from "../../components/HeroCard/hero_card";
import "./single_hero_page.css";
import "../../styles/index.css";
import { heroesDefault } from "../../utils/constants";
import { SimpleSlider } from "../../components/Slider/slider";

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
  const team = heroesDefault;
  useEffect(() => {
    const path = document.location.href.split("/");
    setIdHero(path[path.length - 1]);
  }, []);

  return (
    <>
      <NavigationBar />
      <main className="columnContainer container_single_hero_page">
        <header className="columnContainer header_single">
          <h1>{heroDatas?.heroName ?? "Undefined"}</h1>
          <h4>{heroDatas?.desc ?? "Undefined"}</h4>
        </header>
        <section className="columnContainer container_section_single">
          <h2>Profile</h2>
          <article className="rowContainer container_section_global">
            <div className="container_single_img">
              <span className="border"></span>
              <img
                src={heroDatas?.image ?? "https://picsum.photos/id/237/200/300"}
                alt="hero_image"
                className="single_hero_image"
              />
            </div>
            <div className="columnContainer container_content_section">
              <div className="rowContainer container_cell_datas_hero">
                <h5>Nom :</h5>
                <p>{heroDatas?.name ?? "Undefined"}</p>
              </div>
              <div className="rowContainer container_cell_datas_hero">
                <h5>Sexe :</h5>
                <p>{heroDatas?.sexe ?? "Undefined"}</p>
              </div>
              <div className="rowContainer container_cell_datas_hero">
                <h5>Couleur de cheveux :</h5>
                <p>{heroDatas?.hairColor ?? "Undefined"}</p>
              </div>
              <div className="rowContainer container_cell_datas_hero">
                <h5>Ville protégée :</h5>
                <p>{heroDatas?.city ?? "Undefined"}</p>
              </div>
              <div className="rowContainer container_cell_datas_hero">
                <h5>Ville protégée :</h5>
                <p>{heroDatas?.city ?? "Undefined"}</p>
              </div>
              <div className="rowContainer container_cell_datas_hero">
                <h5>Ville protégée :</h5>
                <p>{heroDatas?.city ?? "Undefined"}</p>
              </div>
            </div>
          </article>
        </section>
        <section className="columnContainer container_team">
          <h2>Team</h2>
          <article className="rowContainer container_team_members">
            {/* {heroDatas?.team.map((teamMember, index: number) => (
              <HeroCard
                key={index}
                id={teamMember.id}
                image={teamMember.image}
                name={teamMember.name}
                team={teamMember.team}
              />
            ))} */}
            <SimpleSlider
              slides={[
                <HeroCard
                  id="dnjefnjfe"
                  team="justice league"
                  name="Superman"
                  image="https://picsum.photos/id/237/200/300"
                />,
                <HeroCard
                  id="dnjefnjfe"
                  team="justice league"
                  name="Superman"
                  image="https://picsum.photos/id/237/200/300"
                />,
                <HeroCard
                  id="dnjefnjfe"
                  team="justice league"
                  name="Superman"
                  image="https://picsum.photos/id/237/200/300"
                />,
                <HeroCard
                  id="dnjefnjfe"
                  team="justice league"
                  name="Superman"
                  image="https://picsum.photos/id/237/200/300"
                />,
                <HeroCard
                  id="dnjefnjfe"
                  team="justice league"
                  name="Superman"
                  image="https://picsum.photos/id/237/200/300"
                />,
                <HeroCard
                  id="dnjefnjfe"
                  team="justice league"
                  name="Superman"
                  image="https://picsum.photos/id/237/200/300"
                />,
              ]}
            />
          </article>
        </section>
      </main>
    </>
  );
};

export default SingleHeroPage;
