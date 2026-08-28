import { getCategoryUrl } from "../services/zeldaApi"
import useFetch from "../hooks/useFetch";
import CompendiumCard from "../components/CompendiumCard"

function HyruleCategory({ category, title }) {

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
        <>
            <h1>{title}</h1>

            <p>Elementos encontrados: {entries.length}</p>

            <div>
                {entries.map((entry) => (
                    <CompendiumCard 
                        key={entry.id} 
                        entry={entry}
                    />
                ))}
            </div>
        </>
    )
}

export default HyruleCategory