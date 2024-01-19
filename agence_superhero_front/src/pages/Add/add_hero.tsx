import React, { useState } from "react";
import NavigationBar from "../../components/Nav/nav";
import Slider from "../../components/Sliders/SliderForm/slider_form";
import {
  HeroCard,
  HeroCardInterface,
} from "../../components/HeroCard/hero_card";
import { HeroAdd } from "../../components/HeroAdd/hero_add";

const AddHeroPage: React.FC = () => {
  const [planetInfos, setPlanetInfos] = useState<number | null>(null);
  const [vehicleInfos, setVehicleInfos] = useState<number | null>(null);
  const [powerInfos, setPowerInfos] = useState<number[]>([]);
  const [nextPowerSlide, setNextPowerSlide] = useState<boolean>(false);
  const [gadgetInfos, setGadgetInfos] = useState<number[]>([]);
  const [nextGadgetSlide, setNextGadgetSlide] = useState<boolean>(false);
  const [cityInfos, setCityInfos] = useState<number[]>([]);
  const [nextCitySlide, setNextCitySlide] = useState<boolean>(false);
  const [teamInfos, setTeamInfo] = useState<number | null>(null);

  const handleSetId = (
    stateFunction: React.Dispatch<React.SetStateAction<number | null>>,
    id: number
  ) => {
    stateFunction(id);
  };

  const handleSetArrayId = (
    stateFunction: React.Dispatch<React.SetStateAction<number[]>>,
    id: number
  ) => {
    stateFunction((prevInfos) => [...prevInfos, id]);
  };

  const handleCloseSlide = (
    stateFunction: React.Dispatch<React.SetStateAction<boolean>>,
    continues = false
  ) => {
    stateFunction(continues);
  };

  return (
    <>
      {/* <NavigationBar /> */}
      {planetInfos === null && (
        <Slider
          getUrl="plannets"
          postUrl="addPlannets"
          sentBackId={(id: number) => handleSetId(setPlanetInfos, id)}
          renderCard={(hero: HeroCardInterface) => (
            <img className="img" src={hero.linkImage} alt="image" />
          )}
        />
      )}
      {planetInfos && vehicleInfos === null && (
        <Slider
          getUrl="vehicles"
          postUrl="addVehicle"
          sentBackId={(id: number) => handleSetId(setVehicleInfos, id)}
          renderCard={(hero: HeroCardInterface) => (
            <img className="img" src={hero.linkImage} alt="image" />
          )}
        />
      )}
      {vehicleInfos && !nextPowerSlide && (
        <Slider
          closeSlide={(continues: boolean | undefined) =>
            handleCloseSlide(setNextPowerSlide, continues)
          }
          getUrl="powers"
          postUrl="addPower"
          sentBackId={(id: number) => handleSetArrayId(setPowerInfos, id)}
          renderCard={(hero: HeroCardInterface) => (
            <img className="img" src={hero.linkImage} alt="image" />
          )}
        />
      )}
      {nextPowerSlide && nextGadgetSlide === false && (
        <Slider
          closeSlide={(continues: boolean | undefined) =>
            handleCloseSlide(setNextGadgetSlide, continues)
          }
          getUrl="gadgets"
          postUrl="addGadget"
          sentBackId={(id: number) => handleSetArrayId(setGadgetInfos, id)}
          renderCard={(hero: HeroCardInterface) => (
            <img className="img" src={hero.linkImage} alt="image" />
          )}
        />
      )}
      {nextGadgetSlide && nextCitySlide === false && (
        <Slider
          closeSlide={(continues: boolean | undefined) =>
            handleCloseSlide(setNextCitySlide, continues)
          }
          getUrl="city"
          postUrl="addCity"
          sentBackId={(id: number) => handleSetArrayId(setCityInfos, id)}
          renderCard={(hero: HeroCardInterface) => (
            <HeroCard
              id={hero.id?.toString() || hero.uuid}
              name={hero.name}
              description={hero.description}
            />
          )}
        />
      )}
      {nextCitySlide && teamInfos === null && (
        <Slider
          getUrl="teams"
          postUrl="addTeam"
          sentBackId={(id: number) => handleSetId(setTeamInfo, id)}
          renderCard={(hero: HeroCardInterface) => (
            <HeroCard
              id={hero.id?.toString() || hero.uuid}
              name={hero.name}
              description={hero.description}
            />
          )}
        />
      )}
      {teamInfos && planetInfos && vehicleInfos && (
        <HeroAdd
          teamId={teamInfos}
          originPlanetId={planetInfos}
          vehicleId={vehicleInfos}
          gadgetsIds={gadgetInfos}
          powersIds={powerInfos}
          citiesIds={cityInfos}
        />
      )}
    </>
  );
};

export default AddHeroPage;
