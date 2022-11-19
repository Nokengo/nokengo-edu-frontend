import React from 'react';

import {
  Button,
  ButtonText,
  Container,
  Content,
  SectionTitle,
  NameBox,
  Title,
  Top,
  UserBox
} from './styles';

const Room: React.FC = () => {
  return (
    <Container>
      <Top>
        <Title>Sala xxxx</Title>
        <SectionTitle>Criar uma conta</SectionTitle>
        <Content>
          <UserBox>
            <video width="500" height="240" controls>
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
            <NameBox>Usuário Samuel</NameBox>
          </UserBox>
          <UserBox>
            <video width="500" height="240" controls>
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
            <NameBox>Usuário Samuel</NameBox>
          </UserBox>
        </Content>
      </Top>

      <Button>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Container>
  );
}

export default Room;