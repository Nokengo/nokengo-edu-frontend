import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home';
import Search from './pages/search';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/call" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
