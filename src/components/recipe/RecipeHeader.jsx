import parse from 'html-react-parser'

/**
 * @desc - Recipe header component
 * @param {string} props.title - The title of the recipe
 * @param {string} props.image - The image url
 * @param {string} props.summary - The summary of the recipe
 * @returns {component} - The recipe header component
 */
const RecipeHeader = ({ title, image, summary }) => {
    return (
        <>
            <h1>{title}</h1>
            <img src={image} />
            <p>{parse(summary)}</p>
        </>
    )
}

export default RecipeHeader