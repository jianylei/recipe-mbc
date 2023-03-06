import parse from 'html-react-parser';
import { parseAnchorTag } from '../../utils/util';

/**
 * @desc - Recipe header component
 * @param {string} props.title - The title of the recipe
 * @param {string} props.image - The image url
 * @param {string} props.summary - The summary of the recipe
 * @returns {component} - The recipe header component
 */
const RecipeHeader = ({ title, image, summary }) => {
  return (
    <div className="recipe-header__container">
      <h1 className="recipe__title">{title}</h1>
      <img className="recipe__image" src={image} />
      <div className="recipe-summary__container">{parse(parseAnchorTag(summary))}</div>
    </div>
  );
};

export default RecipeHeader;
