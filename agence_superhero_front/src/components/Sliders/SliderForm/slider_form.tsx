import React, { useEffect, useState } from "react";
import "../../../styles/index.css";
import "./slider_form.css";
import axios from "axios";
import { PlanetProps } from "../../../utils/interfaces";
import { apiKey, apiUrl } from "../../../utils/api";
import AuthService from "../../../services/auth_services";
import { HeroCardInterface } from "../../HeroCard/hero_card";

interface ObjectProps {
  id: string;
  name: string;
  linkImage: string;
  description: string;
}

interface SliderProps {
  postUrl: string;
  getUrl: string;
  sentBackId: Function;
  closeSlide?: Function;
  isCity?: boolean;
  renderCard: (hero: HeroCardInterface) => React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({
  getUrl,
  postUrl,
  sentBackId,
  closeSlide,
  isCity,
  renderCard,
}) => {
  const _authService = new AuthService();
  const [newContentName, setNewContentName] = useState<string>("");
  const [newContentImageLink, setNewContentImageLink] = useState<string>("");
  const [newContentDescription, setNewContentDescription] =
    useState<string>("");
  const [selectedPlanet, setSelectedPlanet] = useState<string>("1");
  const [slides, setSlides] = useState<Array<ObjectProps>>([]);
  const [planets, setPlanets] = useState([]);
  const [hasAddedOneElt, setHasAddedOneElt] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl + getUrl, {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      });
      setSlides(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (getUrl === "cities") {
      fetchPlanets();
    }
    fetchData();
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await axios.get(apiUrl + "plannets", {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      });
      setPlanets(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const Continue = async () => {
    if (newContentName !== "") {
      try {
        let requestData: any = {
          name: newContentName,
          planetLocationId: selectedPlanet,
        };

        if (isCity) {
          requestData = {
            ...requestData,
          };
        } else if (
          getUrl === "vehicles" ||
          getUrl === "gadgets" ||
          getUrl === "powers" ||
          getUrl === "plannets"
        ) {
          requestData = {
            ...requestData,
            linkImage: newContentImageLink,
            description: newContentDescription,
          };
        } else {
          requestData = {
            ...requestData,
          };
        }

        await axios.post(apiUrl + postUrl, requestData, {
          headers: {
            Authorization: "Bearer " + _authService.getCookie(),
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
          },
        });
        fetchData();
        setHasAddedOneElt(true);
        setNewContentName("");
        setNewContentImageLink("");
        setNewContentDescription("");
      } catch (error) {
        console.error(error);
      }
    } else {
      sentBackId(slides[currentIndex].id);
      setHasAddedOneElt(true);
    }
  };

  return (
    <main className="container_slider_global">
      <div className="container_slider_add rowContainer">
        <span
          onClick={prevSlide}
          className="button_slider_left button_slider alignCenter material-symbols-outlined"
        >
          chevron_left
        </span>
        <div className="container_overflow_slider">
          <div
            className="rowContainer container_content_slider"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="slide_add">
                {renderCard({
                  id: slide.id,
                  name: slide.name,
                  description: slide.description,
                  linkImage: slide.linkImage,
                })}
              </div>
            ))}
          </div>
        </div>

        <span
          onClick={nextSlide}
          className="button_slider button_slider_right alignCenter material-symbols-outlined"
        >
          chevron_right
        </span>
      </div>
      <div className="columnContainer container_slider_panel">
        {slides.length > 0 && slides[currentIndex].name && (
          <h1>{slides[currentIndex].name}</h1>
        )}
        {slides.length > 0 && <h5>{slides[currentIndex].description}</h5>}
        <div className="rowContainer container_separation_add_slider">
          <span></span>
          <p>Add a {getUrl[getUrl.length-1] === "s" ? getUrl.slice(0,-1) : getUrl}</p>
          <span></span>
        </div>
        <input
          value={newContentName}
          onChange={(e) => setNewContentName(e.target.value)}
          type="text"
          name="newInput"
          placeholder="Name"
        />
        {getUrl === "cities" && (
          <select className="select_menu" onChange={(e) => setSelectedPlanet(e.target.value)}>
            {planets.map((planet: PlanetProps, index: number) => (
              <option key={index} value={planet.id}>
                {planet.name}
              </option>
            ))}
          </select>
        )}
        {(getUrl === "vehicles" ||
          getUrl === "gadgets" ||
          getUrl === "powers" ||
          getUrl === "plannets") && (
          <>
            <input
              value={newContentImageLink}
              onChange={(e) => setNewContentImageLink(e.target.value)}
              type="text"
              name="linkImage"
              placeholder="Image Link"
            />
            <input
              value={newContentDescription}
              onChange={(e) => setNewContentDescription(e.target.value)}
              name="description"
              placeholder="Description"
            />
          </>
        )}
        <button onClick={Continue}>{newContentName ? "Create" : "Add"}</button>
        {hasAddedOneElt && closeSlide && (
          <button onClick={() => closeSlide(true)}>Continue</button>
        )}
      </div>
    </main>
  );
};

export default Slider;
