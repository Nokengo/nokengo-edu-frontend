import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthProvider/useAuth';
import { api } from '../../../services/api';

import { Container } from './styles';

const RoomList: React.FC = () => {
  const [rooms, setRooms] = React.useState([]);
  const { id: userId } = useAuth();
  const navigate = useNavigate();

  const getData = async () => {
    const response = await api.get('/v1/meetings');

    setRooms(response.data);
  }

  const handleJoinRoom = async (meetingId: string) => {
    const response = await api.put(`/v1/meetings/${meetingId}`, {
      teacherId: userId,
      status: 'working'
    });

    navigate(`/rooms/${meetingId}`);
  }

  React.useEffect(() => {
    getData();
  }, [userId]);
  return (
    <Container>
      <header id="header" className="relative z-20">
        <div>
          <p className="mb-2 text-sm leading-6 font-semibold text-sky-500 dark:text-sky-400">
            Disciplina: MATEMÁTICA
          </p>
          <div className="flex items-center">
            <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
              Aulas disponíveis
            </h1>
          </div>
        </div>
        <p className="mt-2 text-lg text-slate-700 dark:text-slate-400">
          Selecione abaixo a aula que deseja iniciar.
        </p>
      </header>

      <ul role="list" className="py-6 divide-y divide-slate-600">
        {rooms.map((room: any) => (
          <li className="flex items-center py-4 bg-slate-800">
            <div className='flex gap-4 ml-3 overflow-hidden py-2'>
              <button type="button"
                className='inline-flex items-center px-6 py-1 mx-2 font-semibold leading-6 text-sm shadow rounded-lg text-green-100 bg-green-800 hover:bg-slate-800 transition ease-in-out duration-150 ring-1 ring-green-800/20'>
                DISPONÍVEL
              </button>
            </div>
            <div className="flex gap-4 ml-3 overflow-hidden py-2">
              <p className="text-sm font-medium text-slate-100">Nova aula</p>
              <p className="text-sm text-slate-400 truncate">{room.student.name}</p>
              <p className="text-sm text-slate-400 truncate">{room.student.name}</p>
              <p className="text-sm text-slate-400 truncate">{room.subject.name}</p>
              <p className="text-sm text-slate-400 truncate">{room.id}</p>
            </div>
            <div className='flex gap-4 ml-3 overflow-hidden py-2'>
              <button type="button"
                className='inline-flex items-center px-6 py-1 mx-2 font-semibold leading-6 text-sm shadow rounded-lg text-sky-500 bg-slate-900 hover:bg-slate-800 transition ease-in-out duration-150'
                onClick={() => handleJoinRoom(room.id)}
              >
                Aceitar aula
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Container >
  );
}

export default RoomList;