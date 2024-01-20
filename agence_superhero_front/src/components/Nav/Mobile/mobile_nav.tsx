import "./mobile_nav.css";
import "../../../styles/index.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../../../services/auth_services";
import { navLinks, link } from "../../../utils/links";

const MobileNav: React.FC = () => {
  const _authService = new AuthService();
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const Logout = () => {
    navigate("/signin");
    _authService.deleteCookie();
  };

  useEffect(() => {
    if (_authService.getCookie()) {
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
          {isConnected && (
            <a className="bnt_desktop_nav" onClick={Logout}>
              Logout
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
