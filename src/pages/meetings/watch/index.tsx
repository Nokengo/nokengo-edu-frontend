import React, { useEffect } from 'react';

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

import io from 'socket.io-client';
import Peer from "peerjs";
import { useParams } from 'react-router-dom';

const Room: React.FC = () => {
  const { meetingId, action, userId } = useParams(); 

  //console.log(meetingId);

  //not refactored yet
  const localVideoRef = React.useRef<HTMLVideoElement>(null);
  const remoteVideoRef = React.useRef<HTMLVideoElement>(null);
  const constraints = { video: true, audio: false };
  const pc = React.useRef<RTCPeerConnection>(new RTCPeerConnection());
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = React.useState(true);
  const [remoteSDP, setRemoteSDP] = React.useState<RTCSessionDescriptionInit>();
  // const [candidates, setCandidates] = React.useState<RTCIceCandidate[]>([]);
  const candidates = React.useRef<RTCIceCandidate[]>([]);
  const newMediaStream = React.useRef<MediaStream>();
  const newPeer = React.useRef<Peer>();
  const [isHost, setIsHost] = React.useState(false);

  // const socket = io('http://localhost:3000/');
  const socket = io('https://directback.nokengo.com/');

  //socket connection
  socket.on('connection-success', (success) => {
    console.log(success);

    //join room
    socket.emit('join-room', { meetingId, action, userId});
  });

  socket.on('user-connected', (userId) => {
    console.log('user-connected', userId);
  });

  socket.on('sdp', (message) => {
    if (textRef.current) {
      textRef.current.value = JSON.stringify(message.sdp);
    }
    // console.log('sdp', message);
    if(!isHost) {
      pc.current.setRemoteDescription(new RTCSessionDescription(message.sdp));
      createAnswer();
    } else if(message.action === 'answer') {
      pc.current.setRemoteDescription(new RTCSessionDescription(message.sdp));
    }
  });

  socket.on('candidate', candidate => {
    candidates.current = [...candidates.current, candidate];
    addIceCandidates();
  });

  const getUserMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideoRef.current ? localVideoRef.current.srcObject = stream : null;


    const _pc = new RTCPeerConnection({
      iceServers: [
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: [
                "turn:eu-0.turn.peerjs.com:3478",
                "turn:us-0.turn.peerjs.com:3478", 
            ],
            username: "peerjs",
            credential: "peerjsp"
        }, 
      ],
      iceTransportPolicy: "all",
    });

    _pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('candidate', event.candidate);
      }
    }

    _pc.oniceconnectionstatechange = (event) => {
      //console.log(event);
    }

    _pc.ontrack = (event) => {
      // we got remote stream 
      //console.log('onTrack');
      //console.log(event.streams, 'streams');
      remoteVideoRef.current ? remoteVideoRef.current.srcObject = event.streams[0] : null;
    }

    stream.getTracks().forEach(track => _pc.addTrack(track, stream));

    pc.current = _pc;
  }

  // refactored
  const createOffer = async () => {
    const offer = await pc.current?.createOffer();
    await pc.current?.setLocalDescription(offer);
    socket.emit('sdp', { sdp: pc.current?.localDescription, meetingId, action, userId });
    setIsHost(true);
  }

  const createAnswer = () => {
    pc.current.createAnswer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    }).then((sdp) => {
      pc.current.setLocalDescription(sdp);

      socket.emit('sdp', {
        sdp,
        meetingId,
        userId
      })
    }).catch((error) => { });
  }

  const addIceCandidates = () => {
    candidates.current.forEach(candidate => {
      pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    });
  }

  const handleOnPlay = () => {
    // if(action === 'offer') createOffer();
    // if(action === 'answer') createAnswer();
  }

  return (
    <Container>
      <Top>
        <Title>Sala xxxx</Title>
        <SectionTitle>Criar uma conta</SectionTitle>
        <Content>
          <UserBox>
            <video width="500" height="240" controls ref={localVideoRef} onPlay={handleOnPlay} autoPlay></video>
            <NameBox>Usuário Samuel</NameBox>
          </UserBox>
          <UserBox>
            <video width="500" height="240" controls ref={remoteVideoRef} autoPlay></video>
            <NameBox>Usuário Samuel</NameBox>
          </UserBox>
        </Content>
      </Top>

      <div className="grid grid-cols-2">
        <div className='px-2'>
          <Button onClick={getUserMedia}>
            <ButtonText>Autorizar</ButtonText>
          </Button>
        </div>
        <div className='px-2'>
          <Button onClick={createOffer}>
            <ButtonText>Iniciar</ButtonText>
          </Button>
        </div>
        {/* <div className='px-2'>
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
          <Button onClick={addIceCandidates}>
            <ButtonText>Add candidates</ButtonText>
          </Button>
        </div> */}
      </div>
      {/* <div className="grid grid-cols-2">
        <div className='px-2'>
          <textarea ref={textRef} className={"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}></textarea>
        </div>
      </div> */}

      <Button>
        <ButtonText>Sair</ButtonText>
      </Button>
    </Container>
  );
}

export default Room;