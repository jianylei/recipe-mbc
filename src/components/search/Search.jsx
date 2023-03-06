import { useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import NotFound from "../NotFound"
import SearchItem from "./SearchItem"
import SearchOptions from "./SearchOptions"

const Search = () => {
  const [page, setPage] = useState(1)
  const [numberPerPage, setNumberPerPage] = useState(5)
  const [cuisines, setCuisines] = useState([])

  const { name } = useParams()

  const decoded = decodeURIComponent(name)

  const offset = (page - 1) * numberPerPage

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${decoded}` 
    + `&number=${numberPerPage}&offset=${offset}&cuisine=${cuisines.join(',')}`

  const { loading, error, data: recipes } = useFetch(url)

  let content 

  if (loading) {
    content = <div>Loading...</div>
  }

  if (error) {
    content = <NotFound />
  }

  if (recipes) {
    const recipeList = recipes.results.map((recipe) => {
      return <SearchItem key={recipe.id} recipe={recipe} />
    })

    content = (
      <div>
        <SearchOptions
          cuisineState={[cuisines, setCuisines]} 
          numberPerPageState={[numberPerPage, setNumberPerPage]}
        />
        { recipes.results.length === 0
          ? <div>No recipes found</div>
          : recipeList
        }
      </div>
    )
  
  }

  return content
}

export default Search