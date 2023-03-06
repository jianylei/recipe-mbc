import { useState } from "react"
import { CUISINES } from "../../utils/constants"
const SearchOptions = ({ cuisineState, numberPerPageState }) => {
    const [cuisines, setCuisines] = cuisineState
    const [numberPerPage, setNumberPerPage] = numberPerPageState
    const [checked, setChecked] = useState(
        new Array(CUISINES.length).fill(false)
    )

    const handleCuisineClick = (index) => {
        const newChecked = [...checked]
        newChecked[index] = !newChecked[index]
        setChecked(newChecked)

        if (newChecked[index]) {
            setCuisines([...cuisines, CUISINES[index]])
        } else {
            setCuisines(cuisines.filter((cuisine) => cuisine !== CUISINES[index]))
        }
    }

    const cuisineButtons = CUISINES.map((cuisine, index) => {
        return (
            <button
                className={`btn-select ${checked[index] ? 'btn-active' : ''}`}
                key={index}
                onClick={() => handleCuisineClick(index)}
            >
                {cuisine}
            </button>
        )
    })

    console.log(cuisines)
    return (
        <div className="cuisine-filter__container">
            {cuisineButtons}
        </div>
    )
}

export default SearchOptions