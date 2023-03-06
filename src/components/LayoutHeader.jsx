import SearchBar from "./search/SearchBar"
import { useNavigate } from "react-router-dom"

/**
 * @desc - Layout header component
 */
const LayoutHeader = () => {
    const navigate = useNavigate()
    return (
        <div className="header__container">
            <h1 className="main-header__title crp" onClick={() => navigate('/')} >Recipes</h1>
            <SearchBar />
        </div>
    )
}

export default LayoutHeader