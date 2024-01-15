import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from "../pages/Error/error";
import SignInPage from "../pages/Auth/signin_page";
import SignUpPage from "../pages/Auth/signup_page";
import { HeroCard } from "../components/HeroCard/hero_card";

export const Ways = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signIn" element={<SignInPage/>}/> 
        <Route path="/" element={<HeroCard id="8db666c5-0caf-475d-a67f-4e6bda55366c" image="https://picsum.photos/200/300" name="SUPERMAN" team="Justice league member"/>}/> 
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};
