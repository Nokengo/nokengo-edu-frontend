import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home';
import Room from './pages/room';
import Search from './pages/search';

function AppRoutes() {
  React.useEffect(() => {
    console.log('AppRoutes');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/room" element={<Room />} />
        <Route path="/sign-up" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
