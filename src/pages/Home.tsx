import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Switch from 'react-switch';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoImgDark from '../assets/images/logo-dark.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import googleIconImgDark from '../assets/images/google-icon-dark.svg';
import CircleX from '../assets/images/circle-x.svg';
import Moon from '../assets/images/moon.svg';
import Sun from '../assets/images/sun.svg';

import Button from '../components/Button';
import Modal from '../components/Modal';

import '../styles/auth.scss';

const Home: React.FC = () => {
  const { isInDarkTheme, toggleTheme } = useTheme();

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
        <p>Tire dúvidas em tempo real</p>
      </aside>
      <main>
        <div className='theme-switch'>
          <Switch
            onChange={toggleTheme}
            checked={isInDarkTheme}
            checkedIcon={false}
            uncheckedIcon={false}
            uncheckedHandleIcon={
              <img src={Sun} alt='sun' style={{ width: '26px' }} />
            }
            checkedHandleIcon={<img src={Moon} alt='moon' />}
            offColor='#d4d4d4'
            onColor='#16313f'
          />
        </div>
        <div className='main-content'>
          <img src={isInDarkTheme ? logoImgDark : logoImg} alt='Letmeask' />
          <button onClick={handleCreateRoom} className='create-room'>
            <img
              src={isInDarkTheme ? googleIconImgDark : googleIconImg}
              alt='Logo do Google'
            />
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
