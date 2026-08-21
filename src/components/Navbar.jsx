import { Link } from 'react-router-dom'
import HyruleMenu from './HyruleMenu'
import SearchMenu from './SearchMenu'
import './Navbar.css'

import logo from '../assets/logos/logo_zelda_header.png'

function Navbar() {

    return(

        <nav className='navbar'>

            <div className='navbar__container'>
                <Link className='navbar__brand' to="/">
                    <img className='navbar__logo' src={logo} alt="Logo Zelda BOTW" />
                    <span className='navbar__title'>Zelda BOTW Compendium</span>
                </Link>
                
                <div className='navbar__navigation'>
                    <Link className='navbar__item' to="/">Inicio</Link>

                    <HyruleMenu />
                    <SearchMenu />
                </div>

                <Link className="navbar__item" to="/login">Entrar</Link>
            </div>

        </nav>
    )
}

export default Navbar