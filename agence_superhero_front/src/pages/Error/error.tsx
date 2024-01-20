import { useEffect } from "react";
import AuthService from "../../services/auth_services";
import "./error.css";
import "../../styles/index.css";
import { Link, useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const _authService = new AuthService();
  const navigate = useNavigate();
  useEffect(() => {
    if (_authService.getCookie() == null) {
      navigate("/signin");
    }
  }, []);
  return (
    <main className="columnContainer container_error_page alignCenter">
      <img src="/404_error.png" />
      <h1>You've lost your way ? </h1>
      <Link className="btn_back_home" to={"/"}>Go back to Home</Link>
    </main>
  );
};
