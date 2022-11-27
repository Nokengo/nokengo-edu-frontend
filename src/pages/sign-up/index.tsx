import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { CreateUserDTO } from './dtos/create-user.dto';

import { Button, ButtonText, Container, SectionTitle, Select, SmallButton, SmallButtonText, Text, TextInput, Title, Top } from './styles';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    groupId: 0,
    subjectId: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: parseInt(value) });
  };


  const handleSubmit = async () => {
    if (
      form.name === '' ||
      form.email === '' ||
      form.password === '' ||
      form.confirmPassword === '' ||
      form.groupId === 0 ||
      (form.groupId === 2 && form.subjectId === null)
    ) {
      alert('Preencha todos os campos');
      return false;
    }
    if (form.password !== form.confirmPassword) {
      alert('As senhas não coincidem');
      return false;
    }

    let payload: CreateUserDTO = {
      name: form.name,
      email: form.email,
      password: form.password,
      groupId: form.groupId,
      subjectId: form.subjectId,
    };

    if (form.groupId === 1) {
      delete payload.subjectId;
    }

    console.log(payload);
    try {
      const response = await api.post('/v1/users', payload);
      alert('Usuário cadastrado com sucesso');
      // navigate('/login');
    } catch (error) {
      alert('Erro ao cadastrar');
    }
  };

  console.log(form);
  return (
    <Container>
      <Top>
        <Title>Bem-vindo!</Title>
        <SectionTitle>Criar uma conta</SectionTitle>
        <TextInput name='name' placeholder="Seu nome" onChange={handleInputChange} />
        <TextInput name='email' placeholder="E-mail" onChange={handleInputChange} />
        <TextInput name='password' placeholder="Senha" onChange={handleInputChange} type='password' />
        <TextInput name='confirmPassword' placeholder="Confirme sua senha" onChange={handleInputChange} type='password' />
        <Select name='groupId' onChange={handleSelectChange} >
          <option value="0">Selecione o perfil</option>
          <option value="1">Aluno</option>
          <option value="2">Tutor</option>
        </Select>
        {form.groupId === 2 && (
          <Select name='subjectId' onChange={handleSelectChange}>
            <option value="0">Selecione a disciplina</option>
            <option value="1">Matemática</option>
          </Select>
        )}
      </Top>

      <Button type='button' onClick={() => handleSubmit()}>
        <ButtonText>Entrar</ButtonText>
      </Button>
    </Container>
  );
}

export default SignUp;