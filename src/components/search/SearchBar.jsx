import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import ReactLogo from '../../assets/search.svg';

/**
 * @desc - SearchBar component
 * @onSubmit - Redirect to search page
 */
const SearchBar = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('query');
  const number = searchParams.get('number');
  const cuisine = searchParams.get('cuisine');

  const [search, setSearch] = useState(name || '');

  const navigate = useNavigate();

  const canSave = Boolean(search);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (canSave) {
      navigate({
        pathname: '/search',
        search:
          `?query=${search}&page=1&number=${number || 5}` +
          `${cuisine ? `&cuisine=${cuisine}` : ''}`
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        name="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn-search" disabled={!canSave}>
        <img className="search-icon" src={ReactLogo} alt="Search Icon" />
      </button>
    </form>
  );
};

export default SearchBar;
