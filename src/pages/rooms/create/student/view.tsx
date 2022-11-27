import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthProvider/useAuth';
import { api } from '../../../../services/api';

import { Button, ButtonText, Container, SectionTitle, Select, SmallButton, SmallButtonText, Text, TextInput, Title, Top } from './styles';

const StudentCreateRoom: React.FC = () => {
  const [form, setForm] = React.useState({ subjectId: 0 });
  const { email, id: userId, role } = useAuth();
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: parseInt(value) });
  };

  const handleSubmit = async () => {
    try {
      console.log(userId);
      const { data } = await api.post('/v1/meetings', {
        ...form,
        studentId: userId,
        status: 'available',
      });

      navigate(`/rooms/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(email);
  }, [email]);

  return (
    <Container>
      <Top>
        <Title>Bem-vindo, aluno!</Title>
        <SectionTitle>Solicitação de aula</SectionTitle>

        <Select name='subjectId' onChange={handleSelectChange}>
          <option value="0">Selecione a disciplina</option>
          <option value="1">Matemática</option>
        </Select>
      </Top>

      <Button onClick={() => handleSubmit()} disabled={form.subjectId === 0}>
        <ButtonText>Pesquisar</ButtonText>
      </Button>
    </Container>
  );
}

export default StudentCreateRoom;