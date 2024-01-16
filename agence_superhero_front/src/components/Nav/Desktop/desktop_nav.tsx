import { Link } from 'react-router-dom';
import '../../../styles/index.css';
import './desktop_nav.css';
import { link, navLinks } from '../../../utils/constants';

const DesktopNav: React.FC = () => {
    return (
        <nav className='container_desktop_nav rowContainer'>
            <img className='desktop_logo_nav' src="/logo.png" alt="" />
            <div className='rowContainer container_desktop_nav_links'>
                {navLinks.map((link: link, index :number) => (
                    <Link key={index} className='link' to={link.url}>{link.name}</Link>
                ))}
            </div>
            <div className='rowContainer container_btns_nav_desktop'>
                <Link className='bnt_desktop_nav' to={'/signin'}>Login</Link>
                <Link className='bnt_desktop_nav' to={'/signup'}>Register</Link>
            </div>
        </nav>
    )
}

export default DesktopNav;