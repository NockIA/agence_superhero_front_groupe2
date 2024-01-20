import { useEffect, useState } from "react";
import NavigationBar from "../../components/Nav/nav";
import {
  HeroCard,
  HeroCardInterface,
} from "../../components/HeroCard/hero_card";
import "./single_hero_page.css";
import "../../styles/index.css";
import {
  PowersProps,
  GadgetsProps,
  VehicleProps,
  PlanetProps,
  SingleHeroProps,
} from "../../utils/interfaces";
import { apiUrl } from "../../utils/api";
import { SimpleSlider } from "../../components/Sliders/SliderTeamMembers/slider";
import axios, { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";
import AuthService from "../../services/auth_services";

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
  const [heroDatas, setHeroDatas] = useState<SingleHeroProps>();
  const [idHero, setIdHero] = useState("");
  const location = useLocation();
  const _authService = new AuthService();
  const [teamMembers, setTeamMembers] = useState<Array<HeroCardInterface>>();

  useEffect(() => {
    const path = location.pathname.split("/");
    setIdHero(path[path.length - 1]);
    axios
      .get(apiUrl + "getOneHero/" + path[path.length - 1], {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setHeroDatas(response.data[0]);
        axios
          .get(apiUrl + "getAllHeroOfOneTeams/" + response.data[0].team.id, {
            headers: {
              Authorization: "Bearer " + _authService.getCookie(),
              "Content-Type": "application/json",
            },
          })
          .then((responseTeam) => {
            console.log(responseTeam.data);

            setTeamMembers(responseTeam.data);
          })
          .catch((err) => {
            console.error(err.message);
          });
      });
  }, []);

  const deleteHero = async () => {
    await axios
      .post(
        apiUrl + "deleteHero ",
        { idHero: idHero },
        {
          headers: {
            Authorization: "Bearer " + _authService.getCookie(),
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <>
      <NavigationBar />
      <main className="columnContainer container_single_hero_page">
        <section className="rowContainer header_single">
          <div className="container_single_img">
            <span className="border"></span>
            <img
              src={heroDatas?.linkImage ?? "./src/assets/default_hero.png"}
              alt="hero_image"
              className="single_hero_image"
            />
          </div>
          <div className="columnContainer container_content_header_single">
            <h1>{heroDatas?.heroname ?? "Undefined"}</h1>
            <h4>{heroDatas?.description ?? "Undefined"}</h4>
            <button
              onClick={deleteHero}
              className="delete_hero_btn alignCenter"
            >
              Delete
            </button>
          </div>
          <span className="separation_section_1"></span>
        </section>
        <section className="columnContainer container_section_single">
          <span className="separation_section_2_top"></span>
          <h2>Profile</h2>
          <article className="columnContainer container_content_section">
            <div className="rowContainer container_cell_datas_hero">
              <h5>Firstname :</h5>
              <p>{heroDatas?.firstname ?? "Undefined"}</p>
            </div>
            <div className="rowContainer container_cell_datas_hero">
              <h5>Lastname :</h5>
              <p>{heroDatas?.lastname ?? "Undefined"}</p>
            </div>
            <div className="rowContainer container_cell_datas_hero">
              <h5>Sexe :</h5>
              <p>{heroDatas?.sexe ?? "Undefined"}</p>
            </div>
            <div className="rowContainer container_cell_datas_hero">
              <h5>Hair color :</h5>
              <p>{heroDatas?.hairColor ?? "Undefined"}</p>
            </div>
            <div className="rowContainer container_cell_datas_hero">
              <h5>Origin planet :</h5>
              <p>{heroDatas?.originPlannet.name ?? "Undefined"}</p>
            </div>
            <div className="rowContainer container_cell_datas_hero">
              <h5>Team :</h5>
              <p>{heroDatas?.team.name ?? "Undefined"}</p>
            </div>
          </article>
          <span className="separation_section_2_bottom"></span>
        </section>
        <section className="columnContainer container_team">
          <span className="separation_section_3_top"></span>
          <h2>Gadgets</h2>
          <article className="rowContainer container_team_members">
            {heroDatas?.gadgets && (
              <SimpleSlider
                slides={heroDatas?.gadgets?.map((hero) => (
                  <HeroCard
                    id={hero.id}
                    name={hero.name}
                    team={hero.team}
                    linkImage={hero.linkImage}
                    description={hero.description}
                  />
                ))}
              />
            )}
          </article>
          <span className="separation_section_1"></span>
        </section>
        <section className="columnContainer container_team">
          <span className="separation_section_2_top"></span>
          <h2>Powers</h2>
          <article className="rowContainer container_team_members">
            {heroDatas?.powers && (
              <SimpleSlider
                slides={heroDatas?.powers?.map((hero) => (
                  <HeroCard
                    id={hero.id}
                    name={hero.name}
                    team={hero.team}
                    linkImage={hero.linkImage}
                    description={hero.description}
                  />
                ))}
              />
            )}
          </article>
          <span className="separation_section_2_bottom"></span>
        </section>
        <section className="columnContainer container_team">
          <span className="separation_section_3_top"></span>
          <h2>Protected Cities</h2>
          <article className="rowContainer container_team_members">
            {heroDatas?.city && (
              <SimpleSlider
                slides={heroDatas?.city?.map((hero) => (
                  <HeroCard
                    id={hero.id}
                    name={hero.name}
                    description={hero.description}
                  />
                ))}
              />
            )}
          </article>
          <span className="separation_section_1"></span>
        </section>
        <section className="columnContainer container_team">
          <span className="separation_section_2_top"></span>
          <h2>Team Members</h2>
          <article className="rowContainer container_team_members">
            {teamMembers && (
              <SimpleSlider
                slides={teamMembers.map((hero) => (
                  <HeroCard
                    id={hero.id || hero.UUID}
                    name={hero.name}
                    isHero
                    UUID={hero.UUID}
                    team={hero.team}
                    linkImage={hero.linkImage}
                    description={hero.description}
                  />
                ))}
              />
            )}
          </article>
          <span className="separation_section_2_bottom"></span>
        </section>
      </main>
    </>
  );
};

export default SingleHeroPage;
