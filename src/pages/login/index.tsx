import React, { useEffect } from 'react';
import { LoginReqDto, TokenDto } from '../../contexts/AuthProvider/types';
import { useAuth } from '../../contexts/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Button, ButtonText, Container, SectionTitle, Select, SmallButton, SmallButtonText, Text, TextInput, Title, Top } from './styles';

const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await auth.authenticate(form);
      console.log(response);
      if (response.role == '2') {
        navigate('/rooms/list');
      } else {
        navigate('/rooms/create');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

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