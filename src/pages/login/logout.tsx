import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider/useAuth';

// import { Container } from './styles';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading] = React.useState(false);

  React.useEffect(() => {
    auth.logout();
    navigate('/login');
  }, [auth, navigate]);

  return <></>;
}

export default Logout;