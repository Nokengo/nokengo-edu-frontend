import React from 'react';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../../../contexts/AuthProvider/useAuth';

import StudentCreateRoom from './student/view';
// import { TokenDto } from '../../contexts/AuthProvider/types';
// import TutorDashboardView from '../tutor/dashboard/view';
// import StudentDashboardView from '../student/dashboard/view';

// import { Container } from './styles';

const RoomsCreateView: React.FC = () => {
  const { role } = useAuth();
  return role == '2' ? <></> : <StudentCreateRoom />;
}

export default RoomsCreateView;