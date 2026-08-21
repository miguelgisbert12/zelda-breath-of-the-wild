import { useEffect, useState } from "react";
import { getCategory } from "../services/zeldaApi"
import CompendiumCard from "../components/CompendiumCard"

function HyruleCategory({ category, title }) {
    const [entries, setEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getCategory(category)
        .then((data) => {
            console.log(data.data)
            setEntries(data.data)
        })
        .catch((error) => {
            console.error(error)
            setError("No se han podido cargar los datos")
        })
        .finally(() => {
            setIsLoading(false)
        })

    }, [category])

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

    return(
        <>
            <h1>{title}</h1>

            <p>Elementos encontrados: {entries.length}</p>

            <div>
                {entries.map((entry) => (
                    <CompendiumCard key={entry.id} entry={entry}/>
                ))}
            </div>
        </>
    )
}

export default HyruleCategory