import React from 'react';

import { Button, ButtonText, Container, SectionTitle, Select, SmallButton, SmallButtonText, Text, TextInput, Title, Top } from './styles';

const SignUp: React.FC = () => {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    group: 0,
    subject: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });    
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    
    setForm({ ...form, [name]: parseInt(value) });
  };

  console.log(form);
  return (
    <Container>
      <Top>
        <Title>Bem-vindo!</Title>
        <SectionTitle>Criar uma conta</SectionTitle>
        <TextInput name='name' placeholder="Seu nome" onChange={handleInputChange} />
        <TextInput name='email' placeholder="E-mail"  onChange={handleInputChange} />
        <TextInput name='password' placeholder="Senha"  onChange={handleInputChange} />
        <TextInput name='confirmPassword' placeholder="Confirme sua senha" onChange={handleInputChange}  />
        <Select name='group' onChange={handleSelectChange} >
          <option value="0">Selecione o perfil</option>
          <option value="1">Aluno</option>
          <option value="2">Tutor</option>
        </Select>
        {form.group === 2 && (
          <Select name='subject' onChange={handleSelectChange}>
            <option value="0">Selecione a disciplina</option>
            <option value="1">Matemática</option>
          </Select>
        )}
      </Top>

      <Button>
        <ButtonText>Entrar</ButtonText>
      </Button>
    </Container>
  );
}

export default SignUp;