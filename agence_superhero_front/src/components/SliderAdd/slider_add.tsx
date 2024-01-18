import React, { useEffect, useState } from "react";
import "../Slider/slider.css";
import "../../styles/index.css";
import "./slider_add.css";
import axios from "axios";
import { apiUrl } from "../../utils/constants";
import AuthService from "../../services/auth_services";

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
  isCity?:boolean
}

export const SliderAdd: React.FC<SliderProps> = ({
  getUrl,
  postUrl,
  sentBackId,
  closeSlide,
  isCity
}) => {
  const _authService = new AuthService();
  const [newContentName, setNewContentName] = useState<string>("");
  const [newContentDesc, setNewContentDesc] = useState<string>("");
  const [newContentImage, setNewContentImg] = useState<string>("");
  const [errMsg, setErrMsg] = useState("");
  const [slides, setSlides] = useState<Array<ObjectProps>>([]);

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
    await axios
      .get(apiUrl + getUrl, {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSlides(response.data);
      })
      .catch((err) => {
        setErrMsg(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const Continue = async () => {
    console.log(newContentName, newContentDesc, newContentImage);

    if (newContentName !== "") {
      if (newContentDesc.trim() !== "" && newContentImage.trim() !== "") {
        try {
          await axios
            .post(
              apiUrl + postUrl,
              {
                name: newContentName,
                description: newContentDesc,
                linkImage: newContentImage,
              },
              {
                headers: {
                  Authorization: "Bearer " + _authService.getCookie(),
                  "Content-Type": "application/json",
                },
              }
            )
            .then(() => {
              fetchData();
              setNewContentName("");
              setNewContentImg("");
              setNewContentDesc("");
            });
        } catch (error) {}
      } else {
        setErrMsg("All inputs must be filled");
      }
    } else {
      console.log(slides[currentIndex].id);
      sentBackId(slides[currentIndex].id);
    }
  };

  return (
    <main className="rowContainer container_slider_global">
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
                <img src={slide.linkImage} alt="image" />
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
        {slides.length > 0 &&slides[currentIndex].name && <h1>{slides[currentIndex].name}</h1>}
        {slides.length > 0 && <h5>{slides[currentIndex].description}</h5>}
        <div className="rowContainer container_separation_add_slider">
          <span></span>
          <p>Or</p>
          <span></span>
        </div>
        <input
          value={newContentName}
          onChange={(e) => setNewContentName(e.target.value)}
          type="text"
          name="newInput"
          placeholder="Name"
        />
        <input
          value={newContentDesc}
          onChange={(e) => setNewContentDesc(e.target.value)}
          type="text"
          name="newInput"
          placeholder="Description"
        />
        <input
          value={newContentImage}
          onChange={(e) => setNewContentImg(e.target.value)}
          type="text"
          name="newInput"
          placeholder="Image"
        />
        <button onClick={Continue}>{newContentName ? 'Create':'Add'}</button>
        {closeSlide && <button onClick={()=>closeSlide(true)}>Continue</button>}
      </div>
    </main>
  );
};
