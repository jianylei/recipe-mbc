import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import NotFound from "./NotFound"
import useFetch from "../hooks/useFetch"

const Recipe = () => {
    const { id } = useParams()

    const { loading, error, data: recipe } = useFetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false`)

    return <div></div>
}

export default Recipe