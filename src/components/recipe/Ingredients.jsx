/**
 * @desc - Recipe ingredients component
 * @param {array} ingredients - Array of ingredients objects
 * @returns {component} - The ingredients list component
 */
const Ingredients = ({ ingredients }) => {
    const ingredientList = ingredients.map((ingredient) => {
        return (
            <li key={ingredient.id}>
                {ingredient.name} - {ingredient.measures.us.amount} {ingredient.measures.us.unitShort}
            </li>
        )
    })

    return (
        <>
            <h2>Ingredients</h2>
            <ul id="ingredients">
                {ingredientList}
            </ul>
        </>
    )
}

export default Ingredients