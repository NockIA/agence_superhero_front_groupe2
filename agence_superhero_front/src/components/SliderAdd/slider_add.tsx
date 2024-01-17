import React, { useState } from "react";
import "../Slider/slider.css";
import "../../styles/index.css";
import "./slider_add.css";
import axios from "axios";
import { apiUrl } from "../../utils/constants";

interface ObjectProps {
  id: string;
  name: string;
  image: string;
  desc: string;
}

interface SliderProps {
  slides: Array<ObjectProps>,
  url : string
}

export const SliderAdd: React.FC<SliderProps> = ({ slides , url }) => {
  const [newContentName, setNewContentName] = useState("");
  const [newContentDesc, setNewContentDesc] = useState("");
  const [newContentImage, setNewContentImg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const Continue = () => {
    if (newContentName != "") {
      if (
        newContentName.trim() === "" ||
        newContentDesc.trim() === "" ||
        newContentImage.trim() === ""
      ) {
        axios.post(apiUrl+url , {name : newContentName , desc :newContentDesc , image :newContentImage}).then()
      } else {
        setErrMsg("All inputs must be filled");
      }
    }

    console.log(newContentDesc);
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
                <img src={slide.image} alt="image" />
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
        <h1>{slides[currentIndex].name}</h1>
        <h5>{slides[currentIndex].desc}</h5>
        <div className="rowContainer container_separation_add_slider">
          <span></span>
          <p>Or</p>
          <span></span>
        </div>
        <input
          onChange={(e) => setNewContentName(e.target.value)}
          type="text"
          name="newInput"
          placeholder="Name"
        />
        <input
          onChange={(e) => setNewContentDesc(e.target.value)}
          type="text"
          name="newInput"
          placeholder="Description"
        />
        <input
          onChange={(e) => setNewContentImg(e.target.value)}
          type="text"
          name="newInput"
          placeholder="Image"
        />
        <button onClick={Continue}>Continue</button>
      </div>
    </main>
  );
};
