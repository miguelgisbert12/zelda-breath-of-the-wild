import { useEffect, useState } from "react"
import { getCategory } from "../services/zeldaApi"
import MonsterCard from "../components/MonsterCard.jsx"

function Home() {

    const [monsters, setMonsters] = useState([])

    useEffect(() => {
        getCategory('monsters')
            .then((data) => {
                setMonsters(data.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return(
        <>
            <h1>Inicio</h1>

            <p>Monstruos encontrados: {monsters.length}</p>
            
            <div>
                {monsters.map((monster) => (
                    <MonsterCard
                        key={monster.id}
                        monster={monster}
                    />
                ))}
            </div>
        </>
    )
}

export default Home