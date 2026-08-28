import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

import HyruleMenu from './HyruleMenu'
import SearchMenu from './SearchMenu'
import Container from './Container'

import './Navbar.css'

import logo from '../assets/logos/logo_zelda_header.png'

function Navbar() {

    const [openMenu, setOpenMenu] = useState(null)
    const location = useLocation()

    const isHome = location.pathname === '/'

    const toggleMenu = (menu) => {
        setOpenMenu((currentMenu) => 
            currentMenu === menu ? null : menu,
        )
    }

    return(
        <>
            <nav className='navbar'>

                <Container>
                    <Link className='navbar__brand' to="/">
                        <img className='navbar__logo' src={logo} alt="Logo Zelda BOTW" />
                        <span className='navbar__title'>Zelda BOTW Compendium</span>
                    </Link>
                    
                    <div className='navbar__navigation'>
                        <Link className='navbar__item' to="/">Inicio</Link>

                        <HyruleMenu
                            isOpen={openMenu === 'hyrule'}
                            onToggle={() => toggleMenu('hyrule')}
                        />

                        {!isHome && (
                            <SearchMenu 
                                isOpen={openMenu === 'search'}
                                onToggle={() => toggleMenu('search')}
                            />
                        )}

                        <Link className="navbar__item" to="/login">Entrar</Link>
                    </div>
                </Container>

            </nav>

            {isHome && (
                <SearchMenu isOpen={true} variant="home" />
            )}
        </>

    )
}

export default Navbar