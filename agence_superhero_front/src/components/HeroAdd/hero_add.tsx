import "./hero_add.css";
import "../../styles/index.css";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../utils/api";
import AuthService from "../../services/auth_services";
import { useNavigate } from "react-router-dom";

interface HeroAddProps {
  teamId: number;
  originPlanetId: number;
  vehicleId: number;
  citiesIds: Array<number>;
  gadgetsIds: Array<number>;
  powersIds: Array<number>;
}

export const HeroAdd: React.FC<HeroAddProps> = ({
  teamId,
  originPlanetId,
  vehicleId,
  citiesIds,
  gadgetsIds,
  powersIds,
}) => {
  const _authService = new AuthService();
  const navigate = useNavigate();
  const [firstnameCtrl, setFirstnameCtrl] = useState("");
  const [lastnameCtrl, setLastnameCtrl] = useState("");
  const [heronameCtrl, setHeronameCtrl] = useState("");
  const [sexeCtrl, setSexeCtrl] = useState("");
  const [hairColorCtrl, setHairColorCtrl] = useState("");
  const [descCtrl, setDescCtrl] = useState("");
  const [imgCtrl, setImgCtrl] = useState("");

  const [errMsg, setErrMsg] = useState<string>();

  const areControllersFilled = () => {
    return (
      firstnameCtrl.trim() !== "" &&
      lastnameCtrl.trim() !== "" &&
      heronameCtrl.trim() !== "" &&
      sexeCtrl.trim() !== "" &&
      hairColorCtrl.trim() !== "" &&
      descCtrl.trim() !== "" &&
      imgCtrl.trim() !== ""
    );
  };

  const submitHero = async () => {
    if (areControllersFilled()) {
      await axios
        .post(
          apiUrl + "addHero",
          {
            firstname: firstnameCtrl,
            lastname: lastnameCtrl,
            heroname: heronameCtrl,
            sexe: sexeCtrl,
            hairColor: hairColorCtrl,
            description: descCtrl,
            linkImage: imgCtrl,
            team: teamId,
            originPlannet: originPlanetId,
            vehicle: vehicleId,
          },
          {
            headers: {
              Authorization: "Bearer " + _authService.getCookie(),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const heroId = response.data[0].uuid;

          citiesIds.forEach((currentCityId: number) => {
            axios.post(
              apiUrl + "linkCityToHero",
              {
                heroUuid: heroId,
                cityId: currentCityId,
              },
              {
                headers: {
                  Authorization: "Bearer " + _authService.getCookie(),
                  "Content-Type": "application/json",
                },
              }
            );
          });
          gadgetsIds.forEach((currentGadgetId: number) => {
            axios.post(
              apiUrl + "linkGadgetToHero",
              {
                heroUuid: heroId,
                gadgetId: currentGadgetId,
              },
              {
                headers: {
                  Authorization: "Bearer " + _authService.getCookie(),
                  "Content-Type": "application/json",
                },
              }
            );
          });
          powersIds.forEach((currentPowerId: number) => {
            axios.post(
              apiUrl + "linkPowerToHero",
              {
                heroUuid: heroId,
                powerId: currentPowerId,
              },
              {
                headers: {
                  Authorization: "Bearer " + _authService.getCookie(),
                  "Content-Type": "application/json",
                },
              }
            );
          });
          navigate("/");
        })
        .catch((err: any) => {
          setErrMsg(err.message);
        });
    } else {
      setErrMsg("All fields must be filled");
    }
  };
  return (
    <section className="rowContainer container_hero_add">
      <div className="columnContainer container_single_img_add">
        <span className="border"></span>
        <img
          className="img_hero single_hero_image_add"
          src={imgCtrl != "" ? imgCtrl : "./src/assets/default_hero.png"}
          alt="superhero_img"
        />
      </div>

      <article className="columnContainer container_form_panel">
        <h1>Add your Superhero</h1>
        <div className="columnContainer container_inputs_add_hero">
          <input
            required
            type="text"
            placeholder="Firstname"
            onChange={(e) => setFirstnameCtrl(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Lastname"
            onChange={(e) => setLastnameCtrl(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Hero name"
            onChange={(e) => setHeronameCtrl(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Sexe"
            onChange={(e) => setSexeCtrl(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Hair color"
            onChange={(e) => setHairColorCtrl(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Place the link of the image of your hero"
            onChange={(e) => setImgCtrl(e.target.value)}
          />
          <textarea
            required
            placeholder="Description"
            onChange={(e) => setDescCtrl(e.target.value)}
          />
        </div>
        {errMsg && <p>{errMsg}</p>}
        <button onClick={submitHero}>Submit</button>
      </article>
    </section>
  );
};
