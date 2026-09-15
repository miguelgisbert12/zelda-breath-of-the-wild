import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { getAllEntriesUrl } from '../services/zeldaApi'

import useFetch from '../hooks/useFetch'

import Container from '../components/Container'
import CompendiumCard from '../components/CompendiumCard'
import Pagination from '../components/Pagination'

import './SearchResults.css'

function SearchResults() {

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const searchTerm = searchParams.get('q') || ''
    const [newSearchTerm, setNewSearchTerm] = useState(searchTerm)

    const pageParam = Number(searchParams.get('page')) || 1
    const currentPage = pageParam

    const handleSearchSubmit = (event) => {
        event.preventDefault()

        const term = newSearchTerm.trim()

        if (!term) {
            return
        }

        navigate(`/buscar?q=${encodeURIComponent(term)}`)
    }

    const url = getAllEntriesUrl()

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

    // Calculamos los datos que coinciden con la búsqueda

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

    // Cambiamos de página

    const handlePageChange = (page) => {
        setSearchParams({
            q: searchTerm,
            page: page
        })
    }

    if(isLoading) {
        return (
            <p>Cargando resultados...</p>
        )
    }

    if(error) {
        return (
            <p>No se han podido cargar los resultados.</p>
        )
    }

    return (
        <section className="search-results">
            <Container>

                <h1>
                    Resultados de búsqueda
                </h1>

                <form
                    className="search-results__form"
                    onSubmit={handleSearchSubmit}
                >
                    <input
                        className="search-results__input"
                        type="search"
                        value={newSearchTerm}
                        onChange={(event) => setNewSearchTerm(event.target.value)}
                        placeholder="Buscar en Hyrule..."
                    />

                    <button
                        className="search-results__button"
                        type="submit"
                    >
                        Buscar
                    </button>
                </form>

                <p className="search-results__query">
                    Resultados para: "{searchTerm}"
                </p>

                <p className="search-results__count">
                    {filteredEntries.length} resultados
                </p>

                <div className="search-results__grid">

                    {filteredEntries.length > 0 ? (
                        currentEntries.map((entry) => (
                            <CompendiumCard
                                key={entry.id}
                                entry={entry}
                            />
                        ))
                    ) : (
                        <p className="search-results__no-results">
                            No se han encontrado resultados.
                        </p>
                    )}

                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

            </Container>
        </section>
    )
}

export default SearchResults