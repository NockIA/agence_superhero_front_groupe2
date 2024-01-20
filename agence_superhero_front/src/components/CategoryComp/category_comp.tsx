import React from "react";
import axios from "axios";
import "./category_comp.css";
import "../../styles/index.css";
import { HeroCardInterface } from "../HeroCard/hero_card";
import AuthService from "../../services/auth_services";
import { apiKey, apiUrl } from "../../utils/api";

export interface CategoryCompProps {
  request: string;
  title: string;
  isActive: boolean;
  onUpdateHeroes: (newHeroes: {
    data: Array<HeroCardInterface>;
    title: string;
  }) => void;
}

export const CategoryComp: React.FC<CategoryCompProps> = ({
  request,
  title,
  isActive,
  onUpdateHeroes,
}) => {
  const _authService = new AuthService();
  const handleClick = () => {
    axios
      .get(apiUrl + request, {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      })
      .then((response) => {
        onUpdateHeroes({ data: response.data, title });
      });
  };

  return (
    <article onClick={handleClick} className="columnContainer container_tag">
      <h1
        className={`title_homepage ${
          isActive ? "is_Active_Tag" : "is_not_Active_Tag"
        }`}
      >
        {title}
      </h1>
      <span className="underline_title"></span>
    </article>
  );
};
