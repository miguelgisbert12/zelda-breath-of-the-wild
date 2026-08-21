import { useState } from "react";
import { Link } from 'react-router-dom'

import flecha from '../assets/icons/flecha_desplegable.png'

function HyruleMenu() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return(
        
        <div className="navbar__menu">
            <button type="button" className="navbar__item navbar__item-hyrule" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span>Hyrule</span>
                <img className="icon__arrow-dropdown" src={flecha} alt="Icono flecha desplegable" />
            </button>

            {isMenuOpen && (
                <div className="navbar__dropdown">
                    <Link to="/hyrule/enemigos">Enemigos</Link>
                    <Link to="/hyrule/criaturas">Criaturas</Link>
                    <Link to="/hyrule/materiales">Materiales</Link>
                    <Link to="/hyrule/equipo">Equipo</Link>
                    <Link to="/hyrule/tesoros">Tesoros</Link>
                </div>
            )}
        </div>
        
    )
}

export default HyruleMenu