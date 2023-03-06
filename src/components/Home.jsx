import SearchItem from './search/SearchItem';
import useFetch from '../hooks/useFetch';
import Loading from './Loading';

const Home = () => {
  const {
    loading,
    error,
    data: recipes
  } = useFetch('https://api.spoonacular.com/recipes/random?number=3');

  let content;

  if (loading) {
    content = <Loading />;
  } else {
    content = (
      <div className="home__container">
        <div className="home-section__container">
          <h2 className="home-section__title">Try something new</h2>
          {recipes &&
            recipes.recipes.map((recipe) => {
              return <SearchItem key={recipe.id} recipe={recipe} />;
            })}
        </div>
      </div>
    );
  }

  return content;
};

export default Home;
