import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import Loading from "../Loading"
import NotFound from "../NotFound"
import SearchItem from "./SearchItem"
import SearchOptions from "./SearchOptions"
import Pagination from "./Pagination"
import useWindowDimensions from "../../hooks/useWindowDimensions"

/**
 * @returns {component} - The search page component
 */
const Search = () => {
  const [searchParams] = useSearchParams()
  const name = searchParams.get('query')

  const [page, setPage] = useState(+searchParams.get('page') || 1)
  const [numberPerPage, setNumberPerPage] = useState(searchParams.get('number') || 5)
  const [cuisines, setCuisines] = useState(
    searchParams.get('cuisine') ? searchParams.get('cuisine').split(',') : []
  )

  const { width } = useWindowDimensions()

  const decoded = decodeURIComponent(name)

  const offset = (page - 1) * numberPerPage

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${decoded}` 
    + `&number=${numberPerPage}&offset=${offset}`
    + `${cuisines.length ? `&cuisine=${cuisines.join(',')}` : '' }`

  const { loading, error, data: recipes } = useFetch(url)

  const navigate = useNavigate()

  let content 

  if (loading) {
    content = <Loading />
  }

  if (error) {
    content = <NotFound />
  }

  if (recipes) {
    const onPageChange = (page) => {
      const p = (page < 1) || (page > Math.ceil(recipes.totalResults / numberPerPage))
      ? 1
      : page

      setPage(p)

      navigate({
        pathname: '/search',
        search: `?query=${searchParams.get('query')}`
          + `&page=${p}`
          + `&number=${searchParams.get('number')}`
          + `${searchParams.get('cuisine') ? `&cuisine=${searchParams.get('cuisine')}` : '' }`
      })
    }

    const recipeList = recipes.results.map((recipe) => {
      return <SearchItem key={recipe.id} recipe={recipe} />
    })

    content = (
      <div className="section__container">
        <div className="section-main__container">
          <h1 className="search-results__title">Results for <span>{decoded}</span></h1>
          {
            width <= 904
              ? <SearchOptions
                  cuisineState={[cuisines, setCuisines]} 
                  numberPerPageState={[numberPerPage, setNumberPerPage]}
                  total={recipes.totalResults}
                  currentPage={page}
                  onPageChange={onPageChange}
              />
              : null
          }
          { recipes.results.length === 0
            ? name
              ? <div>No recipes found for {decoded}</div>
              : <div>Search results will be displayed here</div>
            : recipeList
          }
        </div>
        {
          width > 904
            ? <div className="section-side__container">
              <SearchOptions
                cuisineState={[cuisines, setCuisines]} 
                numberPerPageState={[numberPerPage, setNumberPerPage]}
                total={recipes.totalResults}
                currentPage={page}
                onPageChange={onPageChange}
              />
            </div>
            : <Pagination 
                total={recipes.totalResults}
                numberPerPage={numberPerPage}
                currentPage={page}
                onPageChange={onPageChange}
            />
          
        }

      </div>
    )
  
  }

  return content
}

export default Search