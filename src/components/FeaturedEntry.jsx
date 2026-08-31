import { getEntryUrl } from "../services/zeldaApi";
import useFetch from "../hooks/useFetch";
import CompendiumCard from "./CompendiumCard";

function FeaturedEntry({ slug }) {
    
    const url = getEntryUrl(slug)
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
        return null
    }

    return(
        <CompendiumCard entry={entry} />
    )
}

export default FeaturedEntry