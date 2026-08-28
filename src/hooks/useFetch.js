import { useEffect, useState } from 'react'

function useFetch(url) {
    
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        let ignore = false;

        fetch(url)

            .then((response) => {
                if(!response.ok) {
                    throw new Error('Error en la petición')
                }

                return response.json()
            })

            .then((result) => {
                if(!ignore) {
                    setData(result)
                }
            })

            .catch((error) => {
                if(!ignore) {
                    setError(error)
                }
            })

            .finally(() => {
                if(!ignore) {
                    setIsLoading(false)
                }
            })

        return () => {
            ignore = true
        }

    }, [url])

    return {
        data,
        isLoading,
        error,
    }
}

export default useFetch