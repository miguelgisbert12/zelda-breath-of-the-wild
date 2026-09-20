import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Container from "./Container"

function SearchMenu({ isOpen, onToggle, variant = 'dropdown' }) {

    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    const handleSearchSubmit = (event) => {
        event.preventDefault()

        if (!searchTerm.trim()) {
            return
        }

        navigate(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`)
    }

    const isHome = variant === 'home'

    if(isHome) {

        return(
            <Container>
                <section className="search-menu search-menu--home">
                    <div className="navbar__menu__container">
                        <h2>Buscador de Hyrule</h2>

                        <form className="search-menu__form" onSubmit={handleSearchSubmit}>

                            <label htmlFor="home-search" className="sr-only">
                                Buscar elementos del compendio
                            </label>

                            <input 
                                className="search-menu__input"
                                type="search" 
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Escribe aquí..."   
                            />

                            <button className="search-menu__button" type="submit">
                                Buscar
                            </button>
                        </form>
                    </div>
                </section>
            </Container>
        )
    }

    return(
        <div className="navbar__menu">
            <button 
                type="button" 
                className={`navbar__item ${isOpen ? 'navbar__item--open' : ''}`} 
                onClick={onToggle}
            >
                Buscar
            </button>
            
            {isOpen && (
                <div className="search-menu search-menu--dropdown">
                    <div className="search-menu__container">

                        <h3>Buscador de Hyrule</h3>
                        <p>Busca cualquier elemento de la web</p>

                        <form className="search-menu__form" onSubmit={handleSearchSubmit}>

                            <label htmlFor="dropdown-search" className="sr-only">
                                Buscar elementos del compendio
                            </label>

                            <input 
                                className="search-menu__input" 
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                type="search" 
                                placeholder="Escribe aquí..." 
                            />

                            <button className="search-menu__button" type="submit">
                                Buscar
                            </button>
                        </form>
                    </div>

                </div>
            )}
        </div>
    )
}

export default SearchMenu