import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import Loading from "../Loading"
import NotFound from "../NotFound"
import SearchItem from "./SearchItem"
import SearchOptions from "./SearchOptions"

/**
 * @returns {component} - The search page component
 */
const Search = () => {
  const [searchParams] = useSearchParams()
  const name = searchParams.get('query')

  const [page, setPage] = useState(searchParams.get('page') || 1)
  const [numberPerPage, setNumberPerPage] = useState(searchParams.get('number') || 5)
  const [cuisines, setCuisines] = useState(
    searchParams.get('cuisine') ? searchParams.get('cuisine').split(',') : []
  )

  const decoded = decodeURIComponent(name)

  const offset = (page - 1) * numberPerPage

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${decoded}` 
    + `&number=${numberPerPage}&offset=${offset}&cuisine=${cuisines.join(',')}`

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
    const recipeList = recipes.results.map((recipe) => {
      return <SearchItem key={recipe.id} recipe={recipe} />
    })

    content = (
      <div className="search-main__container">
        <div className="search-results__container">
          <h1 className="search-results__title">Results for <span>{decoded}</span></h1>
          { recipes.results.length === 0
            ? name
              ? <div>No recipes found for {decoded}</div>
              : <div>Search results will be displayed here</div>
            : recipeList
          }
        </div>
        <div className="search-filter__container">
          <SearchOptions
            cuisineState={[cuisines, setCuisines]} 
            numberPerPageState={[numberPerPage, setNumberPerPage]}
            total={recipes.totalResults}
            currentPage={page}
            onPageChange={page => {
              const p = (page < 1) || (page > Math.ceil(recipes.totalResults / numberPerPage))
                ? 1
                : page

              setPage(p)

              navigate({
                pathname: '/search',
                search: `?query=${searchParams.get('query')}`
                  + `&page=${p}`
                  + `&number=${searchParams.get('number')}`
                  + `&cuisine=${searchParams.get('cuisine')}`
              })
            }}
          />
        </div>
      </div>
    )
  
  }

  return content
}

export default Search