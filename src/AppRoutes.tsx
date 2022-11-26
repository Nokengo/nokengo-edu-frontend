import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home';
import MeetingsNew from './pages/meetings/new';
import Room from './pages/meetings/watch';
import Search from './pages/search';
import SignUp from './pages/sign-up';

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
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/meetings/new" element={<MeetingsNew />} />
        <Route path="/meetings/watch/:meetingId/:action/:userId" element={<Room />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
