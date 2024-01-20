import { useEffect, useState } from "react";
import NavigationBar from "../../components/Nav/nav";
import {
  HeroCard,
  HeroCardInterface,
} from "../../components/HeroCard/hero_card";
import "./single_hero_page.css";
import "../../styles/index.css";
import { SingleHeroProps } from "../../utils/interfaces";
import { apiKey, apiUrl } from "../../utils/api";
import { SimpleSlider } from "../../components/Sliders/SliderTeamMembers/slider";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth_services";

const SingleHeroPage = () => {
  const [heroDatas, setHeroDatas] = useState<SingleHeroProps>();
  const [idHero, setIdHero] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const _authService = new AuthService();
  const [teamMembers, setTeamMembers] = useState<Array<HeroCardInterface>>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstname, setEditedFirstname] = useState("");
  const [editedLastname, setEditedLastname] = useState("");
  const [editedHeroname, setEditedHeroname] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  const [editedSexe, setEditedSexe] = useState("");
  const [editedHairColor, setEditedHairColor] = useState("");
  const [editedLinkImage, setEditedLinkImage] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/");
    setIdHero(path[path.length - 1]);
    axios
      .get(apiUrl + "getOneHero/" + path[path.length - 1], {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      })
      .then((response: any) => {
        setHeroDatas(response.data[0]);
        console.log("resp", response.data[0]);
        console.log("city", response.data[0].city);
        response.data[0].city.forEach((element : any) => {
          console.log(element.name);
          
        });
        if (response.data[0].team) {
          axios
            .get(apiUrl + "getAllHeroOfOneTeams/" + response.data[0].team.id, {
              headers: {
                Authorization: "Bearer " + _authService.getCookie(),
                "Content-Type": "application/json",
                "X-API-Key": apiKey,
              },
            })
            .then((responseTeam) => {
              console.log(responseTeam.data);

              setTeamMembers(responseTeam.data);
            })
            .catch((err) => {
              console.error(err.message);
            });
        }
      });
  }, []);

  const deleteHero = async () => {
    if (heroDatas?.canModificate) {
      await axios
        .delete(apiUrl + "hero/" + idHero, {
          headers: {
            Authorization: "Bearer " + _authService.getCookie(),
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
          },
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const editHero = async () => {
    if (isEditing) {
      const datas = {
        uuid: idHero,
        firstname:
          editedFirstname != "" ? editedFirstname : heroDatas?.firstname,
        lastname: editedLastname != "" ? editedLastname : heroDatas?.lastname,
        heroname: editedHeroname != "" ? editedHeroname : heroDatas?.heroname,
        sexe: editedSexe != "" ? editedSexe : heroDatas?.sexe,
        hairColor:
          editedHairColor != "" ? editedHairColor : heroDatas?.hairColor,
        description: editedDesc != "" ? editedDesc : heroDatas?.description,
        linkImage:
          editedLinkImage != "" ? editedLinkImage : heroDatas?.linkImage,
        team: heroDatas?.team.id,
        originPlannet: heroDatas?.originPlannet.id,
      };

      axios
        .put(apiUrl + "updateHero", datas, {
          headers: {
            Authorization: "Bearer " + _authService.getCookie(),
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
          },
        }).then(()=>{
          navigate('/');
        })
        .catch((err) => {
          console.error(err.message);
        });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
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
            {isEditing ? (
              <input
                type="text"
                placeholder={heroDatas?.heroname}
                value={editedHeroname}
                onChange={(e) => setEditedHeroname(e.target.value)}
              />
            ) : (
              <h1>{heroDatas?.heroname ?? "Undefined"}</h1>
            )}
            {isEditing ? (
              <input
                type="text"
                placeholder={heroDatas?.description}
                value={editedDesc}
                onChange={(e) => setEditedDesc(e.target.value)}
              />
            ) : (
              <h4>{heroDatas?.description ?? "Undefined"}</h4>
            )}
            {isEditing && (
              <input
                type="text"
                placeholder={heroDatas?.linkImage}
                value={editedLinkImage}
                onChange={(e) => setEditedLinkImage(e.target.value)}
              />
            )}
            {heroDatas?.canModificate && (
              <button onClick={editHero} className="edit_hero_btn alignCenter">
                {isEditing ? "Confirm" : "Edit"}
              </button>
            )}
            {heroDatas?.canModificate && (
              <button
                onClick={deleteHero}
                className="delete_hero_btn alignCenter"
              >
                Delete
              </button>
            )}
          </div>
          <span className="separation_section_1"></span>
        </section>
        <section className="columnContainer container_section_single">
          <span className="separation_section_2_top"></span>
          <h2>Profile</h2>
          <article className="columnContainer container_content_section">
            <div className="rowContainer container_cell_datas_hero">
              <h5>Firstname :</h5>
              {isEditing ? (
                <input
                  type="text"
                  placeholder={heroDatas?.firstname}
                  value={editedFirstname}
                  onChange={(e) => setEditedFirstname(e.target.value)}
                />
              ) : (
                <p>{heroDatas?.firstname ?? "Undefined"}</p>
              )}
            </div>
            <div className="rowContainer container_cell_datas_hero">
              <h5>Lastname :</h5>
              {isEditing ? (
                <input
                  type="text"
                  placeholder={heroDatas?.lastname}
                  value={editedLastname}
                  onChange={(e) => setEditedLastname(e.target.value)}
                />
              ) : (
                <p>{heroDatas?.lastname ?? "Undefined"}</p>
              )}
            </div>
            <div className="rowContainer container_cell_datas_hero">
              <h5>Sexe :</h5>
              {isEditing ? (
                <input
                  type="text"
                  placeholder={heroDatas?.sexe}
                  value={editedSexe}
                  onChange={(e) => setEditedSexe(e.target.value)}
                />
              ) : (
                <p>{heroDatas?.sexe ?? "Undefined"}</p>
              )}
            </div>
            <div className="rowContainer container_cell_datas_hero">
              <h5>Hair color :</h5>
              {isEditing ? (
                <input
                  type="text"
                  placeholder={heroDatas?.hairColor}
                  value={editedHairColor}
                  onChange={(e) => setEditedHairColor(e.target.value)}
                />
              ) : (
                <p>{heroDatas?.hairColor ?? "Undefined"}</p>
              )}
            </div>

            <div className="rowContainer container_cell_datas_hero">
              <h5>Origin planet :</h5>
              <p>{heroDatas?.originPlannet.name ?? "Undefined"}</p>
            </div>
            <div className="rowContainer container_cell_datas_hero">
              <h5>Team :</h5>
              <p>{heroDatas?.team ? heroDatas?.team.name : "No team"}</p>
            </div>
          </article>
          <span className="separation_section_2_bottom"></span>
        </section>

        <section className="columnContainer container_team">
          <span className="separation_section_3_top"></span>
          <h2>Gadgets</h2>
          <article className="rowContainer container_team_members">
            {heroDatas?.gadgets && heroDatas.powers.length > 0 && (
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
            {heroDatas?.powers && heroDatas.powers.length > 0 && (
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
            {heroDatas?.city&& (
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
