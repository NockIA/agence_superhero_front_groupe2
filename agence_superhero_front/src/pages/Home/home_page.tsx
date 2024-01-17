import NavigationBar from "../../components/Nav/nav";
import {
  HeroCard,
  HeroCardInterface,
} from "../../components/HeroCard/hero_card";
import "./home_page.css";
import "../../styles/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, heroesDefault } from "../../utils/constants";
import { tags } from "../../utils/constants";
import { CategoryComp } from "../../components/CategoryComp/category_comp";
import AuthService from "../../services/auth_services";

const HomePage = () => {
  const handleTagClick = (newHeroes: Array<HeroCardInterface>) => {
    setHeroes(newHeroes);
  };
  const _authService  = new AuthService;
  const [searchContent, setSearchContent] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string | null>(tags[0].title);
  const [filteredSearchHeroes, setFilteredSearchHeroes] = useState<
    Array<HeroCardInterface>
  >([]);
  const [heroes, setHeroes] = useState<Array<HeroCardInterface>>(heroesDefault);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchContent(event.target.value);

    if (searchTerm === "") {
      setFilteredSearchHeroes([]);
    } else {
      const filteredHeroes = heroes.filter((hero) =>
        hero.name.toLowerCase().startsWith(searchTerm)
      );
      setFilteredSearchHeroes(filteredHeroes);
    }
  };

  useEffect(() => {
    console.log( _authService.getCookie());
   
    // axios
    //   .get(apiUrl + "getSuperHeros")
    //   .then((response) => {
    //     setHeroes(response.data);
    //   })
    //   .catch((err) => {
    //     setErrorMsg(err.message);
    //   });
  }, []);

  return (
    <>
      <NavigationBar />
      <main className="columnContainer container_homepage">
        <div className="container_search_bar rowContainer">
          <span className="material-symbols-outlined">search</span>
          <input
            className="search_bar"
            placeholder="Enter your hero name..."
            type="search"
            name="search"
            value={searchContent}
            onChange={handleSearch}
          />
        </div>

        <section className="columnContainer">
          <article className="rowContainer container_tags alignCenter">
            {tags.length > 0 &&
              tags.map((tag, index: number) => (
                <CategoryComp
                  key={index}
                  title={tag.title}
                  request={tag.request}
                  isActive={tag.title === activeTag}
                  onUpdateHeroes={handleTagClick}
                  onClick={() => setActiveTag(tag.title)}
                />
              ))}
          </article>

          <article className="rowContainer container_heros alignCenter">
            {searchContent === "" ? (
              heroes.map((hero, index: number) => (
                <HeroCard
                  key={index}
                  id={hero.id}
                  linkImage={hero.linkImage}
                  name={hero.name}
                  team={hero.team}
                  description={hero.description}
                />
              ))
            ) : filteredSearchHeroes.length > 0 ? (
              filteredSearchHeroes.map((hero, index: number) => (
                <HeroCard
                  key={index}
                  id={hero.id}
                  linkImage={hero.linkImage}
                  name={hero.name}
                  team={hero.team}
                  description={hero.description}
                />
              ))
            ) : (
              <p className="error_message">
                {errorMsg || "Pas de superhéro trouvé"}
              </p>
            )}
          </article>
        </section>
      </main>
    </>
  );
};

export default HomePage;
