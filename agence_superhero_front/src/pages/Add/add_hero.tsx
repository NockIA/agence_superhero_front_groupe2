import { useState } from "react";
import NavigationBar from "../../components/Nav/nav";
import { SliderAdd } from "../../components/SliderAdd/slider_add";
import { PlanetTest } from "../../utils/constants";

const AddHeroPage = () => {
  const [planetInfos ,setPlanetInfos] = useState(-1); //name + desc -> id 
  const [vehicleInfos ,setVehicleInfos] = useState(-1); // name + desc -> id
  const [powerInfos ,setPowerInfos] = useState<Array<number>>([]);
  const [nextPowerSlide ,setNextPowerSlide] = useState<boolean>(false);
  const [gadgetInfos ,setGadgetInfos] = useState<Array<number>>([]);
  const [nextGadgetSlide ,setNextGadgetSlide] = useState<boolean>(false);
  const [teamInfos ,setTeamInfo] = useState(-1); //name -> id
  const [cityInfos ,setCityInfos] = useState<Array<number>>([]); //name -> id
  const [heroInfos,setHeroInfos] = useState({}) // avec id Planet/vehicle/powers/gadgets/team/city
  const handleSetIdPlanet = (id : number) => {
    setPlanetInfos(id)
  }
  const handleSetIdVehicle = (id : number) => {
    setVehicleInfos(id)
  }

  const handleSetIdPowers = (id : number) => {
    setPowerInfos((prevPowerInfos) => [...prevPowerInfos, id]);
  }

  const closePowers = (continues : boolean = false) => {
   setNextPowerSlide(continues)
  }

  
  const handleSetIdGadgets = (id : number) => {
    setGadgetInfos((prevPowerInfos) => [...prevPowerInfos, id]);
  }

  
  const closeGadgets = (continues : boolean = false) => {
    setNextGadgetSlide(continues)
   }
 

  return (
    <>
      <NavigationBar />
      {planetInfos == -1 && <SliderAdd getUrl="plannets" postUrl="addPlannets" sentBackId={handleSetIdPlanet}/>}
      {vehicleInfos == -1 && <SliderAdd   getUrl="vehicles" postUrl="addVehicle" sentBackId={handleSetIdVehicle}/>}
      {nextPowerSlide == false && <SliderAdd closeSlide={closePowers} getUrl="powers" postUrl="addPower" sentBackId={handleSetIdPowers}/>}
      {nextGadgetSlide == false && <SliderAdd closeSlide={closeGadgets} getUrl="gadgets" postUrl="addGadget" sentBackId={handleSetIdGadgets}/>}
      //hero form
    </>
  );
};

export default AddHeroPage;
