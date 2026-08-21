import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEntry } from "../services/zeldaApi";

function HyruleEntryDetail() {

    const { category, entryId } = useParams()
    
    const [entry, setEntry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getEntry(entryId)
        .then((data) => {
            setEntry(data)
        })
        .catch((error) => {
            console.error(error)
            setError("No se ha podido cargar el elemento")
        })
        .finally(() => {
            setIsLoading(false)
        })

    }, [entryId])

    if(isLoading) {
        return(
            <p>Cargando...</p>
        )
    }

    if(error) {
        return(
            <p>{error}</p>
        )
    }

    if(!entry) {
        return(
            <p>Elemento no encontrado</p>
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