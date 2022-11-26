import React from 'react';

import { Button, ButtonText, Container, SectionTitle, Select, SmallButton, SmallButtonText, Text, TextInput, Title, Top } from './styles';

const TutorDashboardView: React.FC = () => {
  return (
    <Container>
      <Top>
        <Title>Bem-vindo, tutor!</Title>
        <SectionTitle>Solicitação de aula</SectionTitle>

        <Select name='subject' onChange={()=>{}}>
            <option value="0">Selecione a disciplina</option>
            <option value="1">Matemática</option>
          </Select>
      </Top>

      <Button>
        <ButtonText>Pesquisar</ButtonText>
      </Button>
    </Container>
  );
}

export default TutorDashboardView;