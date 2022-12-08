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
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();

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
  const isReady = useRef(false);
  const [hasPartner, setHasPartner] = React.useState(false);

  const setSocketIo = () => {
    const _socket = io('http://localhost:3000/');
    // const _socket = io('https://backedu.nokengo.com/');
    socket.current = _socket;


    //_socket connection
    _socket.on('connection-success', (success) => {
      console.log(success);

      //join room
      console.log('meetingId', meetingId);
      _socket.emit('join-room', { meetingId, userId, role, email });
    });

    _socket.on('user-connected', (partnerId) => {
      console.log('user-connected', partnerId, userId, email);
      if (userId !== partnerId) {
        setTimeout(() => {
          setHasPartner(true);
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
      console.log('has candidate');
    });

    _socket.on('user-ready', (data) => {
      setTimeout(() => {
        setCanStart(true);
      }, 2000);
    });
  }

  useEffect(() => {
    console.log('ready', ready);
  }, [ready]);

  const getUserMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideoRef.current ? localVideoRef.current.srcObject = stream : null;
    setReady(true);
    isReady.current = true;

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

  const handleExit = () => {
    socket.current?.disconnect();
    navigate('/rooms/create');
  }

  useEffect(() => {
    setSocketIo();
    console.log(1);
  }, [role]);

  return (
    <Container>
      <Top>
        <Content>
          <UserBox>
            <video width="500" height="240" controls ref={localVideoRef} onPlay={handleOnPlay} className='rounded-3xl' autoPlay></video>
            {/* <NameBox>{email}</NameBox> */}
          </UserBox>
          <UserBox>
            <video width="500" height="240" controls ref={remoteVideoRef} autoPlay className='rounded-3xl'></video>
            {/* <NameBox></NameBox> */}
          </UserBox>
        </Content>
      </Top>

      {role && (
        <>
          <div className="grid grid-cols-2">
            {hasPartner && !ready && role == '1' && (
              <div className='px-2'>
                <PingLoadingButton text='Autorizar câmera [al]' disabled={!canAuthorize} onClick={getUserMedia} />
              </div>
            )}

            {!ready && role == '2' && (
              <div className='px-2'>
                <PingLoadingButton text='Autorizar câmera [pr]' disabled={!canAuthorize} onClick={getUserMedia} />
              </div>
            )}


            {role == '1' && (
              <div className='px-2'>
                <PingLoadingButton text='Aguardando professor' disabled={!canStart} waiting={!canStart} onClick={createOffer} />
              </div>
            )}

          </div>
          <div className="grid grid-cols-2 hidden">
            <div className='px-2'>
              <textarea ref={textRef} className={"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}></textarea>
            </div>
          </div>

          <div className="flex justify-center items-center m-8">
            <Button onClick={() => handleExit()} className='bg-rose-300 hover:bg-rose-500 px-16 py-3 flex justify-center items-center rounded-3xl m-auto'>
              <ButtonText>Sair</ButtonText>
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Room;