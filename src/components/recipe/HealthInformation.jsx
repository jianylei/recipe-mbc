/**
 * @desc - Recipe health information component
 * @param {object} recipe - The recipe object
 * @returns {component} - The health information for the recipe
 */
const HealthInformation = ({ recipe }) => {
    const checked = (check) => check ? '✔' : '✘'

    return (
        <ul id="health-information">
            <li>Dairy-free: {checked(recipe.dairyFree)}</li>
            <li>Gluten-free: {checked(recipe.glutenFree)}</li>
            <li>Ketogenic: {checked(recipe.ketogenic)}</li>
            <li>Low FODMAP: {checked(recipe.lowFodmap)}</li>
            <li>Vegan: {checked(recipe.vegan)}</li>
            <li>Vegetarian: {checked(recipe.vegetarian)}</li>
            <li>Very Healthy: {checked(recipe.veryHealthy)}</li>
        </ul>
    )
}

export default HealthInformation