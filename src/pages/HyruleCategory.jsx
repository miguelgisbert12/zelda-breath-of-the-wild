import { getCategoryUrl } from "../services/zeldaApi"
import { getCategoryConfig } from "../utils/categoryConfig";
import { useState } from "react";

import useFetch from "../hooks/useFetch";

import CompendiumCard from "../components/CompendiumCard"
import Container from "../components/Container";
import CategoryHeader from "../components/CategoryHeader";
import Pagination from "../components/Pagination";

import './HyruleCategory.css'
import CategorySearch from "../components/CategorySearch";

function HyruleCategory({ category }) {

    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const categoryConfig = getCategoryConfig(category)
    const url = getCategoryUrl(category)
    const result = useFetch(url)

    const data = result.data
    const isLoading = result.isLoading
    const error = result.error

    const entriesPerPage = 20
    let entries = []

    // Calculamos los datos que llegan desde la API

    if(data) {
        entries = data.data
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1)
    }

    if(isLoading) {
        return(
            <section className="category">
                <Container>
                    <div className="category__loading">
                        <p>Cargando elementos...</p>
                    </div>
                </Container>
            </section>
        )
    }

    if(error) {
        return(
            <section className="category">
                <Container>
                    <div className="category__error">
                        <p>No se han podido cargar los datos</p>
                    </div>
                </Container>
            </section>
        )
    }

    // Calculamos los datos según el filtro del usuario

    let filteredEntries = entries

    if(searchTerm) {
        filteredEntries = entries.filter((entry) => {
            return entry.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        })
    }

    // Calculamos la paginación

    const totalPages = Math.ceil(
        filteredEntries.length / entriesPerPage
    )

    const startIndex = (currentPage - 1) * entriesPerPage
    const endIndex = startIndex + entriesPerPage
    
    const currentEntries = filteredEntries.slice(
        startIndex,
        endIndex
    )

    // Mostramos los elementos con el return

    return(
        <section className="category">

            <Container>
                <CategoryHeader 
                    title={categoryConfig.title}
                    description={categoryConfig.description}
                    count={filteredEntries.length}
                    totalCount={entries.length}
                />

                <CategorySearch 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder={`Buscar ${categoryConfig.title.toLowerCase()}...`}
                />

                <div className="category-results">
                    {filteredEntries.length > 0 ? (

                        currentEntries.map((entry) => (
                            <CompendiumCard 
                                key={entry.id} 
                                entry={entry}
                            />
                        ))

                    ): (
                        <p className="category__no-results">
                            No se han encontrado resultados para "{searchTerm}".
                        </p>
                    )}
                </div>

                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </Container>

        </section>
        
    )
}

export default HyruleCategory