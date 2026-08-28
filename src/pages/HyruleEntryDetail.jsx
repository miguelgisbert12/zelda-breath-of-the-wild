import { useParams } from "react-router-dom";
import { getEntryUrl } from "../services/zeldaApi";
import useFetch from "../hooks/useFetch";

function HyruleEntryDetail() {

    const { category, entryId } = useParams()

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
        return(
            <p>Cargando...</p>
        )
    }

    if(error) {
        return(
            <p>No se ha podido cargar el elemento.</p>
        )
    }

    if(!entry) {
        return(
            <p>Elemento no encontrado.</p>
        )
    }

    return(
        <>
            <h1>{entry.name}</h1>

            <img src={entry.image} alt={entry.name} />

            <p>{entry.description}</p>
            <p>Categoría: {category}</p>
        </>
    )
}

export default HyruleEntryDetail