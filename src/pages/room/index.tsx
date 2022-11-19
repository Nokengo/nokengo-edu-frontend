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
  const localVideoRef = React.useRef<HTMLVideoElement>(null);
  const remoteVideoRef = React.useRef<HTMLVideoElement>(null);
  const constraints = { video: true, audio: false };

  // const getUserMedia = () => {
  //   navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: false
  //   }).then(stream => {
  //     if (localVideoRef.current) {
  //       localVideoRef.current.srcObject = stream;
  //     }
  //   }).catch(err => {
  //     console.error(err);
  //   });
  // }

  const getUserMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideoRef.current ? localVideoRef.current.srcObject = stream : null;
  }

  return (
    <Container>
      <Top>
        <Title>Sala xxxx</Title>
        <SectionTitle>Criar uma conta</SectionTitle>
        <Content>
          <UserBox>
            <video width="500" height="240" controls ref={localVideoRef} autoPlay></video>
            <NameBox>Usuário Samuel</NameBox>
          </UserBox>
          <UserBox>
            <video width="500" height="240" controls ref={remoteVideoRef}>
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg" />
              Your browser does not support the video tag.
            </video>
            <NameBox>Usuário Samuel</NameBox>
          </UserBox>
        </Content>
      </Top>
      <Button onClick={getUserMedia}>
        <ButtonText>Entrar na sala</ButtonText>
      </Button>

      <Button>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Container>
  );
}

export default Room;