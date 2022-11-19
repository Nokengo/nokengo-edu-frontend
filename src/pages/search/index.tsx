import React from 'react';

import { Button, ButtonText, Container, SectionTitle, SmallButton, SmallButtonText, Text, TextInput, Title, Top } from './styles';

const Search: React.FC = () => {
  return (
    <Container>
      <Top>
        <Title>Bem-vindo!</Title>
        <SectionTitle>Criar uma conta</SectionTitle>
        <TextInput placeholder="Seu nome" />
        <TextInput placeholder="Sala UID" />
      </Top>

      <Button>
        <ButtonText>Entrar</ButtonText>
      </Button>
    </Container>
  );
}

export default Search;