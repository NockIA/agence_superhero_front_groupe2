import { Link } from 'react-router-dom';
import '../../../styles/index.css';
import './desktop_nav.css';
import { link, navLinks } from '../../../utils/constants';

const DesktopNav: React.FC = () => {
    return (
        <nav className='container_desktop_nav rowContainer'>
            <img className='desktop_logo_nav' src="./src/assets/Images/logo.png" alt="" />
            <div className='rowContainer container_desktop_nav_links'>
                {navLinks.map((link: link) => (
                    <Link className='link' to={link.url}>{link.name}</Link>
                ))}
            </div>
            <div className='rowContainer container_btns_nav_desktop'>
                <Link className='bnt_desktop_nav' to={'/signin'}>Se connecter</Link>
                <Link className='bnt_desktop_nav' to={'/signup'}>S'inscrire</Link>
            </div>
        </nav>
    )
}

export default DesktopNav;