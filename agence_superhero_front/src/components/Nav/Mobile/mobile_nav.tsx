import './mobile_nav.css';
import '../../../styles/index.css';
import { navLinks } from '../../../utils/constants';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const MobileNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav className='container_mobile_nav rowContainer' >
            <img className='logo_mobile_nav' src="/logo.png" alt="logo" />
            <span onClick={() => setIsOpen(true)} className="burger_nav material-symbols-outlined">
                menu
            </span>
            {isOpen && <div className='columnContainer container_hidden_nav alignCenter'>
                <span onClick={() => setIsOpen(false)} className="close_burger material-symbols-outlined">close</span>
                <ul className='columnContainer container_mobile_links'>
                    {navLinks.map((link, index: number) => (
                        <Link key={index} className='link_mobile' to={link.url}>{link.name}</Link>
                    ))}
                </ul>
                <Link className='btn_sign_mobile' to={'/signin'}>Se connecter</Link>
                <Link className='btn_sign_mobile' to={'/signup'}>S'inscrire</Link>
            </div>
            }

        </nav>
    );
};

export default MobileNav;