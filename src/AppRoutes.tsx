import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes';
import { Home } from './pages/home';
import Login from './pages/login';
import Logout from './pages/login/logout';
import Meeting from './pages/meetings/watch';
import RoomsCreateView from './pages/rooms/create';
import RoomList from './pages/rooms/list';
import Room from './pages/rooms/watch';
import SignUp from './pages/sign-up';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/rooms/create" element={<RoomsCreateView />} />
          <Route path="/rooms/list" element={<RoomList />} />
          <Route path="/rooms/:meetingId" element={<Room />} />
          <Route path="/meetings/watch/:meetingId" element={<Meeting />} />

          {/* <Route path="/student/dashboard" element={<StudentDashboardView />} />
          <Route path="/tutor/dashboard" element={<TutorDashboardView />} />
          <Route path="/search" element={<Search />} />
          <Route path="/room" element={<Room />} />
          <Route path="/meetings/new" element={<MeetingsNew />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
