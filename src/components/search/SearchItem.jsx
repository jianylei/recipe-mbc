import { useNavigate } from "react-router-dom"
const SearchItem = ({ recipe }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/recipes/${recipe.id}`)
    }

    return (
        <div onClick={handleClick}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
        </div>
    )
}

export default SearchItem