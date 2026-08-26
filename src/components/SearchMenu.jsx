
function SearchMenu({ isOpen, onToggle, variant = 'dropdown' }) {

    const isHome = variant === 'home'

    if(isHome) {

        return(
            <section className="search-menu search-menu--home">
                <div className="navbar__menu__container">
                    <h2>Buscador de Hyrule</h2>

                    <form className="search-menu__form">
                        <input 
                            className="search-menu__input"
                            type="search" 
                            placeholder="Escribe aquí..."   
                        />

                        <button className="search-menu__button" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
            </section>
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

                        <form className="search-menu__form">
                            <input 
                                className="search-menu__input" 
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