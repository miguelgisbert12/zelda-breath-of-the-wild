import { useState, useEffect } from "react"
import { getCategory, getEntry } from "../services/zeldaApi"
import MonsterCard from "../components/MonsterCard"

function Enemies() {
    
    const [enemies, setEnemies] = useState([])

    useEffect(() => {
        getCategory('monsters')
        .then((data) => {
            setEnemies(data.data)
        })

        .catch((error) => {
            console.error(error)
        })
    }, [])

    useEffect(() => {
        getEntry('white-maned_lynel')
        .then((data) => {
            console.log(data)
        })

        .catch((error) => {
            console.error(error)
        })
    }, [])

    return(
        <>
            <h1>Enemigos</h1>

            <p>Enemigos encontrados: {enemies.length}</p>

            <div>
                {enemies.map((enemy) => (
                    <MonsterCard 
                        key={enemy.id}
                        monster={enemy}
                    />
                ))}
            </div>
        </>
    )
}

export default Enemies