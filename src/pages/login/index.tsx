import React, { useEffect } from 'react';
import { LoginReqDto, TokenDto } from '../../contexts/AuthProvider/types';
import { useAuth } from '../../contexts/AuthProvider/useAuth';
import {useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Button, ButtonText, Container, SectionTitle, Select, SmallButton, SmallButtonText, Text, TextInput, Title, Top } from './styles';

const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try{
      await auth.authenticate(form);
      // navigate('/search');
    } catch (err) {
      console.log('Invalid email or password');
    }
  }

  useEffect(() => {
    if(auth.token){
        const decoded: TokenDto = jwt_decode(auth.token);
      navigate(decoded.role === '2' ? '/student/dashboard' : '/tutor/dashboard');
    }
  }, [auth.token]);

  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });    
  };

  console.log(form);
  return (
    <Container>
      <Top>
        <Title>Bem-vindo!</Title>
        <SectionTitle>Acesse a sua conta</SectionTitle>
      
        <TextInput name='email' placeholder="E-mail" onChange={handleInputChange} />
        <TextInput name='password' placeholder="Senha" type={'password'} onChange={handleInputChange} />
      </Top>

      <Button onClick={() => handleSubmit()}>
        <ButtonText>Entrar</ButtonText>
      </Button>
    </Container>
  );
}

export default Login;