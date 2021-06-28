import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import CircleX from '../assets/images/circle-x.svg';

import Button from '../components/Button';
import Modal from '../components/Modal';

import '../styles/auth.scss';

const Home: React.FC = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState('');
  const [isNotExistingRoomModalOpen, setIsNotExistingRoomModalOpen] =
    useState(false);

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      setIsNotExistingRoomModalOpen(true);
      return;
    }

    if (roomRef.val().endedAt) {
      history.push({
        pathname: `/rooms/${roomCode}`,
        state: { closedRoom: true },
      });
      return;
    }

    history.push({
      pathname: `/rooms/${roomCode}`,
      state: { closedRoom: false },
    });
  }

  return (
    <div id='page-auth'>
      <Modal
        isOpen={isNotExistingRoomModalOpen}
        icon={CircleX}
        title='A sala não existe'
        message='Por favor, verifique o código e tente novamente.'
        onCancel={() => setIsNotExistingRoomModalOpen(false)}
        noConfirmButtons
      />
      <aside>
        <img
          src={illustrationImg}
          alt='Ilustração simbolizando perguntas e respostas'
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask' />
          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt='Logo do Google' />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={(event) => {
                setRoomCode(event.target.value);
              }}
              value={roomCode}
            />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
