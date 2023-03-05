import { useParams } from "react-router-dom"
import parse from 'html-react-parser'
import NotFound from "./NotFound"
import useFetch from "../hooks/useFetch"

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
        const checked = (check) => check ? '✔' : '✘'

        const ingredients = recipe.extendedIngredients.map((ingredient) => {
            return (
                <li key={ingredient.id}>
                    {ingredient.name} - {ingredient.measures.us.amount} {ingredient.measures.us.unitShort}
                </li>
            )
        })

        const instructions = recipe.analyzedInstructions[0].steps.map(step => {
            return (
                <li key={step.number}>
                    {step.step}
                </li>
            )
        })

        content = (
            <div>
                <h1>{recipe.title}</h1>
                <img src={recipe.image} />

                <p>{parse(recipe.summary)}</p>
                
                <ul id="health-information">
                    <li>Dairy-free: {checked(recipe.dairyFree)}</li>
                    <li>Gluten-free: {checked(recipe.glutenFree)}</li>
                    <li>Ketogenic: {checked(recipe.ketogenic)}</li>
                    <li>Low FODMAP: {checked(recipe.lowFodmap)}</li>
                    <li>Vegan: {checked(recipe.vegan)}</li>
                    <li>Vegetarian: {checked(recipe.vegetarian)}</li>
                    <li>Very Healthy: {checked(recipe.veryHealthy)}</li>
                </ul>

                <h2>Ingredients</h2>
                <ul id="ingredients">
                    {ingredients}
                </ul>

                <h2>Instructions</h2>
                <ol id="instructions">
                    {instructions}
                </ol>
            </div>
        )
    }

    return content
}

export default Recipe