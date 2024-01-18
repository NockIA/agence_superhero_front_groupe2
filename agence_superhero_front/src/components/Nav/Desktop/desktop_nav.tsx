import { Link, useNavigate } from "react-router-dom";
import "../../../styles/index.css";
import "./desktop_nav.css";
import AuthService from "../../../services/auth_services";
import { useEffect, useState } from "react";
import { navLinks, link } from "../../../utils/links";

const DesktopNav: React.FC = () => {
  const _authService = new AuthService();
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (_authService.getCookie()) {
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
          <Link key={index} className="link" to={link.url}>
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
        {isConnected && (
          <a className="bnt_desktop_nav" onClick={Logout}>
            Logout
          </a>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
