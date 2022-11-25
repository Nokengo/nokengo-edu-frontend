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
  const { meetingId } = useParams();

  console.log(meetingId);

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

  const socket = io(
    'http://localhost:3333/webRTCPeers',
    // 'https://edu.nokengo.com/webRTCPeers',
    {
      path: '/webrtc',
      query: {
        meetingId: meetingId
      }
    }
  );

  //socket connection
  socket.on('connection-success', (success) => {
    console.log(success);
  });

  socket.on('sdp', (message) => {
    if (textRef.current) {
      textRef.current.value = JSON.stringify(message.sdp);
    }
    console.log('sdp', message);
  });

  socket.on('candidate', candidate => {
    console.log('candidate', candidate);
    candidates.current = [...candidates.current, candidate];
  });

  const getUserMedia = async () => {
    // const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // localVideoRef.current ? localVideoRef.current.srcObject = stream : null;


    // const _pc = new RTCPeerConnection({
    //   // iceTransportPolicy: 'relay',
    //   iceServers: [
    //     {
    //       "urls": "stun:157.230.134.132:3478",
    //       "username": "username",
    //       "credential": "password"
    //     },
    //     {
    //       "urls": "turn:157.230.134.132:3478",
    //       "username": "username",
    //       "credential": "password"
    //     }
    //   ]
    // });

    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideoRef.current ? localVideoRef.current.srcObject = mediaStream : null;

    // const peer = new Peer({
    //   host: "edu.nokengo.com",
    //   path: "/",
    //   port: 443,
    // });

    // newPeer.current = peer;
    // newMediaStream.current = mediaStream;

    // peer.on('open', function (id) {
    //   console.log('My peer ID is: ' + id);
    // });

    // peer.on('connection', function (conn) {
    //   conn.on('data', function (data) {
    //     // Will print 'hi!'
    //     console.log(data);
    //   });
    // });

    // peer.on('call', function (call) {
    //   // Answer the call, providing our mediaStream
    //   call.answer(mediaStream);
    // });


    // console.log(peer);



    // const _pc = new RTCPeerConnection();

    // _pc.onicecandidate = (event) => {
    //   if (event.candidate) {
    //     console.log(JSON.stringify(event.candidate));
    //     socket.emit('candidate', event.candidate);
    //   }
    // }

    // _pc.oniceconnectionstatechange = (event) => {
    //   console.log(event);
    // }

    // _pc.ontrack = (event) => {
    //   // we got remote stream 
    //   console.log('onTrack');
    //   console.log(event.streams, 'streams');
    //   remoteVideoRef.current ? remoteVideoRef.current.srcObject = event.streams[0] : null;
    // }

    // stream.getTracks().forEach(track => _pc.addTrack(track, stream));

    // pc.current = peer;
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
    // pc.current.createOffer({
    //   offerToReceiveAudio: true,
    //   offerToReceiveVideo: true
    // }).then((sdp) => {
    //   console.log(JSON.stringify(sdp));
    //   pc.current.setLocalDescription(sdp);

    //   // send the offer to the other peer
    //   socket.emit('sdp', {
    //     sdp
    //   })
    // }).catch((error) => { });
    if (textRef.current && newPeer.current && newMediaStream.current) {
      var call = newPeer.current.call(textRef.current.value, newMediaStream.current);

      call.on('stream', function (stream: any) {
        // `stream` is the MediaStream of the remote peer.
        // Here you'd add it to an HTML video/canvas element.
        remoteVideoRef.current ? remoteVideoRef.current.srcObject = stream : null;
      });
    }
  }

  const createAnswer = () => {
    // pc.current.createAnswer({
    //   offerToReceiveAudio: true,
    //   offerToReceiveVideo: true
    // }).then((sdp) => {
    //   console.log(JSON.stringify(sdp));
    //   pc.current.setLocalDescription(sdp);

    //   // send the answer sdp to the offering peer
    //   socket.emit('sdp', {
    //     sdp
    //   })
    // }).catch((error) => { });

    if (newPeer.current && newMediaStream.current) {

      newPeer.current.on('call', function (call) {
        // Answer the call, providing our mediaStream
        call.answer(newMediaStream.current);
      });
    }
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
    // // pc.current.addIceCandidate(new RTCIceCandidate(candidates[0]));
    // candidates.current.forEach(candidate => {
    //   console.log('candidate', candidate);
    //   pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    //   if (candidate.candidate.includes('relay')) {
    //   } else {
    //     console.log('not relay');
    //   }
    // });
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