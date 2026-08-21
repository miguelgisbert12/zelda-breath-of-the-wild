import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEntry } from "../services/zeldaApi"
import { Link } from "react-router-dom"

function EnemyDetail() {
    
    const { enemyId } = useParams()

    const [enemy, setEnemy] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        getEntry(enemyId)
        .then((data) => {
            setEnemy(data)
        })
        .catch((error) => {
            console.error(error)
            setError("No se ha podido cargar el enemigo")
        })
        .finally(() => {
            setIsLoading(false)
        })

    }, [enemyId])

    if(isLoading) {
        return(
            <p>Cargando enemigo...</p>
        )
    }

    if(error) {
        return(
            <p>{error}</p>
        )
    }

    if(!enemy) {
        return(
            <p>Enemigo no encontrado</p>
        )
    }

    return(
        <>
            <Link to="/hyrule/enemigos">
                Volver a enemigos
            </Link>
            
            <h1>{enemy.name}</h1>
            <img src={enemy.image} alt={enemy.name} />
            <p>{enemy.description}</p>
        </>
    )
}

export default EnemyDetail