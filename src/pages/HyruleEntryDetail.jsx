import { Link, useParams } from 'react-router-dom'

import { getEntryUrl } from '../services/zeldaApi'

import useFetch from '../hooks/useFetch'

import Container from '../components/Container'
import EntryHeader from '../components/EntryHeader'
import EntryInfo from '../components/EntryInfo'
import EntryAttributes from '../components/EntryAttributes'

import capitalizeWords from '../utils/capitalizeWords'
import { getCategoryConfig } from '../utils/categoryConfig'

import './HyruleEntryDetail.css'
import Breadcrumb from '../components/Breadcrumb'

function HyruleEntryDetail() {

    const { entryId } = useParams()

    const url = getEntryUrl(entryId)

    const result = useFetch(url)

    const data = result.data
    const isLoading = result.isLoading
    const error = result.error

    let entry = null

    if(data) {
        entry = data.data
    }

    if(isLoading) {
        return (
            <p>Cargando...</p>
        )
    }

    if(error) {
        return (
            <p>No se ha podido cargar el elemento.</p>
        )
    }

    if(!entry) {
        return (
            <p>Elemento no encontrado.</p>
        )
    }

    const categoryConfig = getCategoryConfig(entry.category)

    return (
        <section className="entry-detail">
            <Container>

                <Breadcrumb category={categoryConfig} entryName={capitalizeWords(entry.name)} />

                <Link
                    className="entry-detail__back"
                    to={`/hyrule/${categoryConfig.slug}`}
                >
                    Volver a {categoryConfig.title}
                </Link>

                <EntryHeader entry={entry} />

                <EntryInfo entry={entry} />

                <EntryAttributes entry={entry} />

            </Container>
        </section>
    )
}

export default HyruleEntryDetail