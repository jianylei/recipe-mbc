import { useState } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import NotFound from "../NotFound"
import SearchItem from "./SearchItem"

const Search = () => {
  const [page, setPage] = useState(1)
  const [numberPerPage, setNumberPerPage] = useState(5)

  const { name } = useParams()

  const decoded = decodeURIComponent(name)

  const offset = (page - 1) * numberPerPage

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${decoded}&offset=${offset}&number=${numberPerPage}`

  const { loading, error, data: recipes } = useFetch(url)

  let content 

  if (loading) {
    content = <div>Loading...</div>
  }

  if (error) {
    content = <NotFound />
  }

  if (recipes) {
    if (recipes.results.length === 0) {
      content = <div>No results found for {decoded}</div>
    } else {
      const recipeList = recipes.results.map((recipe) => {
        return <SearchItem key={recipe.id} recipe={recipe} />
      })

      content = (
        <div>
          {recipeList}
        </div>
      )
    }
  }

  return content
}

export default Search