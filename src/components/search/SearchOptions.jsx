import { useEffect, useState } from "react"
import { CUISINES } from "../../utils/constants"
import { useNavigate, useSearchParams } from "react-router-dom"

const SearchOptions = ({ cuisineState, numberPerPageState }) => {
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
        navigate({
            pathname: '/search',
            search: `?query=${searchParams.get('query')}`
                + `&page=${searchParams.get('page')}`
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
        navigate({
            pathname: '/search',
            search: `?query=${searchParams.get('query')}`
                + `&page=${searchParams.get('page')}`
                + `&number=${num}`
                + `&cuisine=${cuisines.join(',')}`
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
        </div>
    )
}

export default SearchOptions