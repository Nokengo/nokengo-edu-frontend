import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedLayout } from './components/ProtectedLayout';
import { Home } from './pages/home';
import Login from './pages/login';
import Logout from './pages/login/logout';
import MeetingsNew from './pages/meetings/new';
import Room from './pages/meetings/watch';
import Search from './pages/search';
import SignUp from './pages/sign-up';
import StudentDashboardView from './pages/student/dashboard/view';
import TutorDashboardView from './pages/tutor/dashboard/view';

function AppRoutes() {
  React.useEffect(() => {
    console.log('AppRoutes');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        </Routes>
        <ProtectedLayout>
          <Routes>
            <Route path="/student/dashboard" element={<StudentDashboardView />} />
            <Route path="/tutor/dashboard" element={<TutorDashboardView />} />
            <Route path="/search" element={<Search />} />
            <Route path="/room" element={<Room />} />
            <Route path="/meetings/new" element={<MeetingsNew />} />
            <Route path="/meetings/watch/:meetingId/:action/:userId" element={<Room />} />
          </Routes>
        </ProtectedLayout>
    </BrowserRouter>
  )
}

export default AppRoutes
