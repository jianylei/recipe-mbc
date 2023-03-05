import { useEffect, useState } from "react"

/**
 * @desc A custom hook to fetch data from an API
 * @param {string} url - The URL to fetch
 * @returns {object} { loading, error, data }  
 */
const useFetch = (url) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            headers: new Headers({
                'x-api-key': import.meta.env.VITE_SPOONACULAR_KEY
            })
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data)
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [url])

    return { loading, error, data }
}

export default useFetch