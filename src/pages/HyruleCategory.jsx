import { getCategoryUrl } from "../services/zeldaApi"
import { getCategoryConfig } from "../utils/categoryConfig";

import useFetch from "../hooks/useFetch";

import CompendiumCard from "../components/CompendiumCard"
import Container from "../components/Container";
import CategoryHeader from "../components/CategoryHeader";

import './HyruleCategory.css'

function HyruleCategory({ category }) {

    const categoryConfig = getCategoryConfig(category)
    const url = getCategoryUrl(category)
    const result = useFetch(url)

    const data = result.data
    const isLoading = result.isLoading
    const error = result.error

    let entries = []

    if(data) {
        entries = data.data
    }

    if(isLoading) {
        return(
            <p>Cargando...</p>
        )
    }

    if(error) {
        return(
            <p>No se han podido cargar los datos.</p>
        )
    }

    return(
        <section className="category">

            <Container>
                <CategoryHeader 
                    title={categoryConfig.title}
                    description={categoryConfig.description}
                    count={entries.length}
                />

                <div className="category-results">
                    {entries.map((entry) => (
                        <CompendiumCard 
                            key={entry.id} 
                            entry={entry}
                        />
                    ))}
                </div>
            </Container>


        </section>
        
    )
}

export default HyruleCategory