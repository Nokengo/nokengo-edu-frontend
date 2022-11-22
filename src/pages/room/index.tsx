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
            <video width="500" height="240" controls ref={remoteVideoRef} autoPlay></video>
            <NameBox>Usuário Samuel</NameBox>
          </UserBox>
        </Content>
      </Top>

      <div className="grid grid-cols-5">
        <div className='px-2'>
          <Button onClick={getUserMedia}>
            <ButtonText>Autorizar</ButtonText>
          </Button>
        </div>
        <div className='px-2'>
          <Button onClick={getUserMedia}>
            <ButtonText>Create offer</ButtonText>
          </Button>
        </div>
        <div className='px-2'>
          <Button onClick={getUserMedia}>
            <ButtonText>Create answer</ButtonText>
          </Button>
        </div>
        <div className='px-2'>
          <Button onClick={getUserMedia}>
            <ButtonText>Set remote</ButtonText>
          </Button>
        </div>
        <div className='px-2'>
          <Button onClick={getUserMedia}>
            <ButtonText>Entrar na sala</ButtonText>
          </Button>
        </div>
      </div>



      <Button>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Container>
  );
}

export default Room;