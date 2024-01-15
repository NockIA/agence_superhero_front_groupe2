import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../utils/constants";
import "./category_comp.css";
import "../../styles/index.css";
import { HeroCardInterface } from "../HeroCard/hero_card";

export interface CategoryCompProps {
  method: string;
  request: string;
  title: string;
  isActive:boolean,
  onClick : Function
  onUpdateHeroes: (newHeroes: Array<HeroCardInterface>) => void;
}

export const CategoryComp: React.FC<CategoryCompProps> = ({
  method,
  request,
  title,
  isActive,
  onUpdateHeroes,
}) => {
  const handleClick = () => {
    switch (method) {
      case "POST":
        let idUser = 1; // remplacer par get id user
        axios.post(apiUrl + request, { idUser: idUser }).then((response) => {
          onUpdateHeroes(response.data);
        });
        break;
      default:
        axios.get(apiUrl + request).then((response) => {
          onUpdateHeroes(response.data);
        });
        break;
    }
  };

  return (
    <article
      onClick={handleClick}
      className="columnContainer container_tag"
    >
      <h1  className={`title_homepage ${
        isActive ? 'is_Active_Tag' : 'is_not_Active_Tag'
      }`}>{title}</h1>
      <span className="underline_title"></span>
    </article>
  );
};
