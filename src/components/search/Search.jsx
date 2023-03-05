import {  useParams } from "react-router-dom"

const Search = () => {
  const { name } = useParams()

  const decoded = decodeURIComponent(name)

  return (
    <div>{decoded || 'asdasd'}</div>
  )
}

export default Search