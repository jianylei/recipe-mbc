import { Routes, Route } from 'react-router-dom'
import Recipe from './components/recipe/Recipe'
import Home from './components/Home'
import Search from './components/search/Search'
import NotFound from './components/NotFound'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='search'>
          <Route index element={<></>} />
          <Route path=':name' element={<Search />} />
        </Route>
        <Route path='recipes/:id' element={<Recipe />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
