import { Link } from 'react-router-dom'

import flecha from '../assets/icons/flecha_desplegable.png'

function HyruleMenu({ isOpen, onToggle }) {

    return(
        
        <div className="navbar__menu">
            <button 
                type="button" 
                className={`navbar__item navbar__item-hyrule ${isOpen ? 'navbar__item--open' : ''}`} 
                onClick={onToggle}>

                <span>Hyrule</span>
                <img className="icon__arrow-dropdown" src={flecha} alt="" />
            </button>

            {isOpen && (
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