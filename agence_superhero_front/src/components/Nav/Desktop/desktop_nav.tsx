import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../styles/index.css";
import "./desktop_nav.css";
import AuthService from "../../../services/auth_services";
import { useEffect, useState } from "react";
import { navLinks, link } from "../../../utils/links";
import axios from "axios";
import { apiKey, apiUrl } from "../../../utils/api";
import { UserInfos } from "../../../utils/interfaces";

const DesktopNav: React.FC = () => {
  const _authService = new AuthService();
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfos, setUserInfos] = useState<UserInfos | undefined>();

  useEffect(() => {
    if (_authService.getCookie()) {
      axios
        .get(apiUrl + "getMyInfo", {
          headers: {
            Authorization: "Bearer " + _authService.getCookie(),
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
          },
        })
        .then((response) => {
          setUserInfos(response.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [_authService.getCookie()]);

  const Logout = () => {
    navigate("/signin");
    _authService.deleteCookie();
  };
  return (
    <nav className="container_desktop_nav rowContainer">
      <img className="desktop_logo_nav" src="/logo.png" alt="" />
      <div className="rowContainer container_desktop_nav_links">
        {navLinks.map((link: link, index: number) => (
          <Link
            key={index}
            className={`link ${
              location.pathname === link.url ? "active_link" : ""
            }`}
            to={link.url}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="rowContainer container_btns_nav_desktop">
        {isConnected == false && (
          <>
            <Link className="bnt_desktop_nav" to={"/signin"}>
              Login
            </Link>
            <Link className="bnt_desktop_nav" to={"/signup"}>
              Register
            </Link>
          </>
        )}
        <Link to={"/profile"}>
          <img
            className="user_profile_picture"
            src={userInfos?.linkProfileImage ?? "/no_image.png"}
            alt="user_profile_picture"
          />
        </Link>
      </div>
    </nav>
  );
};

export default DesktopNav;
