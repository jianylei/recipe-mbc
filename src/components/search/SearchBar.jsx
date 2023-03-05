import { useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * @desc - SearchBar component
 * @onSubmit - Redirect to search page
 */
const SearchBar = () => {
    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    const canSave = Boolean(search)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (canSave) {
            navigate(`/search/${encodeURIComponent(search)}`)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button disabled={!canSave}>search</button>
        </form>
    )
}

export default SearchBar