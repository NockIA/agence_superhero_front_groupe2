import React, { useState } from "react";
import "./slider.css";
import "../../../styles/index.css";

interface SliderProps {
  slides: JSX.Element[];
}

export const SimpleSlider: React.FC<SliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="container_slider rowContainer">
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
            transform: `translateX(-${currentIndex * 20}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              {slide}
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
  );
};
