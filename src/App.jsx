import { Routes, Route } from 'react-router-dom'
import Recipe from './components/Recipe'
import Home from './components/Home'
import Search from './components/Search'
import NotFound from './components/NotFound'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='search' element={<Search />} />
      <Route path='recipes/:id' element={<Recipe />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
