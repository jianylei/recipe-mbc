/**
 * @desc - Recipe ingredients component
 * @param {array} ingredients - Array of ingredients objects
 * @returns {component} - The ingredients list component
 */
const Ingredients = ({ ingredients }) => {
  const ingredientList = ingredients?.map((ingredient, idx) => {
    return (
      <li key={idx}>
        {ingredient.name} - {ingredient.measures.us.amount} {ingredient.measures.us.unitShort}
      </li>
    );
  });

  return (
    <div className="ingredients__container">
      <h2>Ingredients</h2>
      <ul id="ingredients">{ingredientList || 'No ingredients available'}</ul>
    </div>
  );
};

export default Ingredients;
