import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from "../pages/Error/error";
import DesktopNav from "../components/Nav/Desktop/desktop_nav";
import SignInPage from "../pages/Auth/signin_page";
import SignUpPage from "../pages/Auth/signup_page";

export const Ways = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/signIn" element={<SignInPage/>}></Route>    
        <Route path="/" element={<DesktopNav/>}></Route>    
        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
