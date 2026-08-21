import { useState } from "react";

function SearchMenu() {
    
    const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false)

    return(
        <>
            <div className="navbar__menu">
                <button type="button" className="navbar__item" onClick={() => setIsSearchMenuOpen(!isSearchMenuOpen)}>
                    Buscar
                </button>

                {isSearchMenuOpen && (
                    <div className="navbar__dropdown">
                        <h3>Búsqueda avanzada</h3>
                        <p>Escribe para buscar</p>

                        <input type="text" placeholder="Escribe aquí" />

                        <button type="button">Buscar</button>
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchMenu