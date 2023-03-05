import { useParams } from "react-router-dom"
import NotFound from "../NotFound"
import useFetch from "../../hooks/useFetch"
import HealthInformation from "./HealthInformation"
import Ingredients from "./Ingredients"
import Instructions from "./Instructions"
import RecipeHeader from "./RecipeHeader"

/**
 * @queryParam {string} id - The id of the recipe
 * @returns {component} - The recipe page component
 */
const Recipe = () => {
    const { id } = useParams()

    const { loading, error, data: recipe } = useFetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`)

    let content

    if (loading) {
        content = <div>Loading...</div>
    }

    if (error) {
        content = <NotFound />
    }

    if (recipe) {
        content = (
            <div>
                <RecipeHeader
                    title={recipe.title}
                    image={recipe.image}
                    summary={recipe.summary}
                />
                <HealthInformation recipe={recipe} />
                <Ingredients ingredients={recipe.extendedIngredients} />
                <Instructions instructions={recipe.analyzedInstructions[0]} />
            </div>
        )
    }

    return content
}

export default Recipe