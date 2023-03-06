/**
 * @desc - Recipe health information component
 * @param {object} recipe - The recipe object
 * @returns {component} - The health information for the recipe
 */
const HealthInformation = ({ recipe }) => {
    const checked = (check) => check ? '✔' : '✘'
    const healthInformation = [ 
        { name: 'Dairy-free', value: recipe.dairyFree },
        { name: 'Gluten-free', value: recipe.glutenFree },
        { name: 'Ketogenic', value: recipe.ketogenic },
        { name: 'Low FODMAP', value: recipe.lowFodmap },
        { name: 'Vegan', value: recipe.vegan }, 
        { name: 'Vegetarian', value: recipe.vegetarian },
        { name: 'Very Healthy', value: recipe.veryHealthy }
    ]

    const healthInformationList = healthInformation.map(info => {
        return (
            <button 
                key={info.name}
                className={`btn-select btn-disable ${info.value ? 'btn-active' : ''}`}
            >
                {checked(info.value)} {info.name}
            </button>
        )
    })

    return (
        <ul className="health__container" id="health-information">
            {healthInformationList}
        </ul>
    )
}

export default HealthInformation