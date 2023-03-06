import { useNavigate } from "react-router-dom"
const SearchItem = ({ recipe }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/recipes/${recipe.id}`)
    }

    return (
        <div className="search-item__container">
            <h2
                className="search-item-title"
                onClick={handleClick}
            >
                {recipe.title}
            </h2>
            <img
                className="search-item-image"
                src={recipe.image}
                alt={recipe.title}
                loading="lazy"
                onClick={handleClick}
            />
        </div>
    )
}

export default SearchItem