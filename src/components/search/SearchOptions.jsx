import { useEffect, useState } from "react"
import { CUISINES } from "../../utils/constants"
import { useNavigate, useSearchParams } from "react-router-dom"
import Pagination from "./Pagination"

/**
 * @param {Object} cuisineState - Cuisine state
 * @param {Object} numberPerPageState - Number per page state
 * @param {Number} total - Total number of recipes
 * @param {Number} currentPage - Current page number
 * @param {Function} onPageChange - Function to change page
 * @returns {component} - Search options component
 */
const SearchOptions = ({
    cuisineState,
    numberPerPageState,
    total,
    currentPage,
    onPageChange
}) => {
    const [cuisines, setCuisines] = cuisineState
    const [numberPerPage, setNumberPerPage] = numberPerPageState
    const [checked, setChecked] = useState(
        new Array(CUISINES.length).fill(false)
    )

    const [searchParams] = useSearchParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (cuisines.length) {
            const newChecked = new Array(CUISINES.length).fill(false)
            CUISINES.forEach((cuisine, index) => {
                if (cuisines.includes(cuisine)) {
                    newChecked[index] = true
                }
            })
            setChecked(newChecked)
        }
    }, [])

    const handleCuisineClick = (index) => {
        const newChecked = [...checked]
        newChecked[index] = !newChecked[index]
        setChecked(newChecked)
        onPageChange(1)

        navigate({
            pathname: '/search',
            search: `?query=${searchParams.get('query')}`
                + `&page=1`
                + `&number=${searchParams.get('number')}` 
                + `&cuisine=${newChecked[index] ? cuisines.concat(CUISINES[index]).join(',') :
                    cuisines.filter((cuisine) => cuisine !== CUISINES[index]).join(',')}`
        })

        if (newChecked[index]) {
            setCuisines([...cuisines, CUISINES[index]])
        } else {
            setCuisines(cuisines.filter((cuisine) => cuisine !== CUISINES[index]))
        }
        
    }

    const handleNumberClick = (num) => {
        onPageChange(1)
        navigate({
            pathname: '/search',
            search: `?query=${searchParams.get('query')}`
                + `&page=1`
                + `&number=${num}`
                + `${searchParams.get('cuisine') ? `&cuisine=${searchParams.get('cuisine')}` : ''}`
        })
        setNumberPerPage(num)
    }

    const handleReset = () => {
        navigate({
            pathname: '/search',
            search: `?query=${searchParams.get('query')}`
                + `&page=1`
                + `&number=5`
        })
        setChecked(new Array(CUISINES.length).fill(false))
        setCuisines([])
        setNumberPerPage(5)
        onPageChange(1)
    }

    const cuisineButtons = CUISINES.map((cuisine, index) => {
        return (
            <button
                className={`btn-select ${checked[index] ? 'btn-active' : ''}`}
                key={index}
                onClick={() => handleCuisineClick(index)}
            >
                {cuisine.replace('-', ' ')}
            </button>
        )
    })

    const numberButtons = [5, 10, 25, 50].map((number) => {
        return (
            <button
                className={`btn-select btn-num ${+numberPerPage === +number ? 'btn-active' : ''}`}
                key={number}
                onClick={() => handleNumberClick(number)}
            >
                {number}
            </button>
        )
    })

    return (
        <div className="filter-main__container">
            <h2>Search Options</h2>
            <h3>Recipes per page</h3>
            <div className="filter-number__container">
                {numberButtons}
            </div>
            <h3>Filter by cuisine</h3>
            <div className="filter-cuisine__container">
                {cuisineButtons}
            </div>
            <button className="btn-reset" onClick={handleReset}>Reset</button>
            <Pagination 
                total={total}
                numberPerPage={numberPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    )
}

export default SearchOptions