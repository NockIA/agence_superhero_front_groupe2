import "./mobile_nav.css";
import "../../../styles/index.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../../../services/auth_services";
import { navLinks, link } from "../../../utils/links";
import axios from "axios";
import { apiKey, apiUrl } from "../../../utils/api";
import { UserInfos } from "../../../utils/interfaces";

const MobileNav: React.FC = () => {
  const _authService = new AuthService();
  const [isConnected, setIsConnected] = useState(false);
  const [userInfos, setUserInfos] = useState<UserInfos | undefined>();
  const [isOpen, setIsOpen] = useState(false);

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
  return (
    <nav className="container_mobile_nav rowContainer">
      <img className="logo_mobile_nav" src="/logo.png" alt="logo" />
      <span
        onClick={() => setIsOpen(true)}
        className="burger_nav material-symbols-outlined"
      >
        menu
      </span>
      {isOpen && (
        <div className="columnContainer container_hidden_nav alignCenter">
          <span
            onClick={() => setIsOpen(false)}
            className="close_burger material-symbols-outlined"
          >
            close
          </span>
          <ul className="columnContainer container_mobile_links">
            {navLinks.map((link: link, index: number) => (
              <Link key={index} className="link_mobile" to={link.url}>
                {link.name}
              </Link>
            ))}
          </ul>
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
      )}
    </nav>
  );
};

export default MobileNav;
