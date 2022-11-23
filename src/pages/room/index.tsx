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
  const pc = React.useRef<RTCPeerConnection>(new RTCPeerConnection());
  const textRef = React.useRef<HTMLTextAreaElement>(null);

  const getUserMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideoRef.current ? localVideoRef.current.srcObject = stream : null;


    const _pc = new RTCPeerConnection();
    _pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(JSON.stringify(event.candidate));
      }
    }

    _pc.oniceconnectionstatechange = (event) => {
      console.log(event);
    }

    _pc.ontrack = (event) => {
      // we got remote stream 
      console.log('onTrack');
      remoteVideoRef.current ? remoteVideoRef.current.srcObject = event.streams[0] : null;
    }

    stream.getTracks().forEach(track => _pc.addTrack(track, stream));

    pc.current = _pc;
  }

  // const getIceCandidates = async () => {
  //   const _pc = new RTCPeerConnection();
  //   _pc.onicecandidate = (event) => {
  //     if (event.candidate) {
  //       console.log(event.candidate);
  //     }
  //   }

  //   _pc.oniceconnectionstatechange = (event) => {
  //     console.log(event);
  //   }

  //   _pc.ontrack = (event) => {
  //     // we got remote stream 
  //     console.log('onTrack');
  //     remoteVideoRef.current ? remoteVideoRef.current.srcObject = event.streams[0] : null;
  //   }

  //   pc.current = _pc;
  // }

  // const createOffer = async () => {
  //   const offer = await pc.current?.createOffer();
  //   await pc.current?.setLocalDescription(offer);
  //   console.log(offer);
  // }

  const createOffer = () => {
    pc.current.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    }).then((sdp) => {
      pc.current.setLocalDescription(sdp);
      console.log(JSON.stringify(sdp));
    }).catch((error) => { });
  }

  const createAnswer = () => {
    pc.current.createAnswer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    }).then((sdp) => {
      pc.current.setLocalDescription(sdp);
      console.log(JSON.stringify(sdp));
    }).catch((error) => { });
  }

  const setRemoteDescription = () => {
    // get remote sdp from other peer
    if (textRef.current) {
      const sdp = JSON.parse(textRef.current.value);
      console.log(sdp);

      pc.current.setRemoteDescription(new RTCSessionDescription(sdp));
    }
  }

  const addIceCandidate = () => {
    const candidate = JSON.parse(textRef.current?.value || '');
    console.log('Addind candidate...', candidate);
    pc.current.addIceCandidate(new RTCIceCandidate(candidate));
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
          <Button onClick={createOffer}>
            <ButtonText>Create offer</ButtonText>
          </Button>
        </div>
        <div className='px-2'>
          <Button onClick={createAnswer}>
            <ButtonText>Create answer</ButtonText>
          </Button>
        </div>
        <div className='px-2'>
          <Button onClick={setRemoteDescription}>
            <ButtonText>Set remote description</ButtonText>
          </Button>
        </div>
        <div className='px-2'>
          <Button onClick={addIceCandidate}>
            <ButtonText>Add candidates</ButtonText>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className='px-2'>
          <textarea ref={textRef} className={"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}></textarea>
        </div>
      </div>



      <Button>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Container>
  );
}

export default Room;