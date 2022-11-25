import React from 'react';

import { Button, ButtonText, Container, SectionTitle, Select, SmallButton, SmallButtonText, Text, TextInput, Title, Top } from './styles';

const MeetingsNew: React.FC = () => {
  return (
    <Container>
      <Top>
        <Title>Solicitar tutoria</Title>
        <SectionTitle>Selecione a disciplina que deseja procurar um tutor</SectionTitle>

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

export default MeetingsNew;