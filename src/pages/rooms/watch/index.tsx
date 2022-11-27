import React, { useEffect, useRef } from 'react';

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

import io, { Socket } from 'socket.io-client';
import Peer from "peerjs";
import { useParams } from 'react-router-dom';
import PingLoadingButton from '../../../components/PingLoading';
import { useAuth } from '../../../contexts/AuthProvider/useAuth';


const Room: React.FC = () => {
  const [waiting, setWaiting] = React.useState(true);
  const [canAuthorize, setCanAuthorize] = React.useState(true);
  const [canStart, setCanStart] = React.useState(false);
  const { meetingId } = useParams();
  const { id: userId, role, email } = useAuth();
  const [partnerReady, setPartnerReady] = React.useState(false);
  const [ready, setReady] = React.useState(false);

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
  const socket = useRef<Socket>();

  const setSocketIo = () => {
    const _socket = io('http://localhost:3000/');
    socket.current = _socket;

    // const _socket = io('https://directback.nokengo.com/');

    //_socket connection
    _socket.on('connection-success', (success) => {
      console.log(success);

      //join room
      _socket.emit('join-room', { meetingId, userId });
    });

    _socket.on('user-connected', (partnerId) => {
      console.log('user-connected', partnerId, userId, email);
      if (userId !== partnerId) {
        setTimeout(() => {
          // setCanStart(true);
        }, 2000);
      }
    });

    _socket.on('sdp', (message) => {
      if (textRef.current) {
        textRef.current.value = JSON.stringify(message.sdp);
      }
      // console.log('sdp', message);
      if (!isHost) {
        pc.current.setRemoteDescription(new RTCSessionDescription(message.sdp));
        createAnswer();
      }
      // if (message.action === 'answer') {
      //   pc.current.setRemoteDescription(new RTCSessionDescription(message.sdp));
      // }
    });

    _socket.on('candidate', candidate => {
      candidates.current = [...candidates.current, candidate];
      addIceCandidates();
    });

    _socket.on('user-ready', (data) => {
      console.log('ready', data);
      setPartnerReady(true);
      if (ready) {
        setCanStart(true);
      }
    });
  }

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
        socket.current?.emit('candidate', event.candidate);
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

    socket.current?.emit('ready', userId);

    setReady(true);
    if (partnerReady) {
      setCanStart(true);
    }
  }

  // refactored
  const createOffer = async () => {
    const offer = await pc.current?.createOffer();
    await pc.current?.setLocalDescription(offer);
    socket.current?.emit('sdp', { sdp: pc.current?.localDescription, meetingId, userId });
    setIsHost(true);
  }

  const createAnswer = () => {
    pc.current.createAnswer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    }).then((sdp) => {
      pc.current.setLocalDescription(sdp);

      socket.current?.emit('sdp', {
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

  useEffect(() => {
    // getUserMedia();
    setSocketIo();
    console.log(1);
  }, [role]);

  return (
    <Container>
      <Top>
        <Title>Sala xxxx</Title>
        <SectionTitle>Criar uma conta</SectionTitle>
        <Content>
          <UserBox>
            <video width="500" height="240" controls ref={localVideoRef} onPlay={handleOnPlay} className='rounded-3xl' autoPlay></video>
            <NameBox>Usuário Samuel</NameBox>
          </UserBox>
          <UserBox>
            <video width="500" height="240" controls ref={remoteVideoRef} autoPlay className='rounded-3xl'></video>
            <NameBox>Usuário Samuel</NameBox>
          </UserBox>
        </Content>
      </Top>

      <div className="grid grid-cols-2">
        <div className='px-2'>
          <PingLoadingButton text='Autorizar câmera' disabled={!canAuthorize} onClick={getUserMedia} />
        </div>
        <div className='px-2'>
          <PingLoadingButton text='Aguardando professor' disabled={!canStart} waiting={!canStart} onClick={createOffer} />
        </div>
      </div>
      <div className="grid grid-cols-2 hidden">
        <div className='px-2'>
          <textarea ref={textRef} className={"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}></textarea>
        </div>
      </div>

      <div className="flex justify-center items-center m-8">
        <Button className='bg-rose-300 hover:bg-rose-500 px-16 py-3 flex justify-center items-center rounded-3xl m-auto'>
          <ButtonText>Sair</ButtonText>
        </Button>
      </div>
    </Container>
  );
}

export default Room;