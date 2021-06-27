import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import emptyQuestions from '../assets/images/empty-questions.svg';
import deleteImg from '../assets/images/delete.svg';
import deleteImgRed from '../assets/images/delete-red.svg';
import CircleX from '../assets/images/circle-x.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import Button from '../components/Button';
import Modal from '../components/Modal';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

const AdminRoom: React.FC = () => {
  const { user } = useAuth();

  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title, authorId } = useRoom(roomId);

  const [isDeleteQuestionModalOpen, setIsDeleteQuestionModalOpen] =
    useState(false);
  const [isEndRoomModalOpen, setIsEndRoomModalOpen] = useState(false);

  useEffect(() => {
    if (authorId) {
      if (user?.id !== authorId) {
        history.push(`/rooms/${roomId}`);
      }
    }
  }, [authorId]);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    setIsEndRoomModalOpen(false);
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setIsDeleteQuestionModalOpen(false);
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Letmeask' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => setIsEndRoomModalOpen(true)}>
              Encerrar sala
            </Button>
            <Modal
              isOpen={isEndRoomModalOpen}
              icon={CircleX}
              title='Encerrar sala'
              message='Tem certeza que você deseja encerrar esta sala?'
              onCancel={() => setIsEndRoomModalOpen(false)}
              onConfirm={handleEndRoom}
            />
          </div>
        </div>
      </header>

      <main>
        {!title ? (
          <Loader />
        ) : (
          <>
            <div className='room-title'>
              <h1>Sala {title}</h1>
              {questions.length > 0 && (
                <span>{questions.length} pergunta(s)</span>
              )}
            </div>

            <div className='question-list'>
              {questions.length === 0 ? (
                <div className='no-questions'>
                  <img src={emptyQuestions} alt='Ainda não há perguntas' />
                  <span>Ainda não foram feitas perguntas.</span>
                </div>
              ) : (
                <>
                  {questions.map((question) => (
                    <Question
                      key={question.id}
                      content={question.content}
                      author={question.author}
                      isAnswered={question.isAnswered}
                      isHighlighted={question.isHighlighted}
                      isAnonymous={question.isAnonymous}>
                      {!question.isAnswered && (
                        <>
                          <button
                            type='button'
                            onClick={() =>
                              handleCheckQuestionAsAnswered(question.id)
                            }>
                            <img
                              src={checkImg}
                              alt='Marcar pergunta como respondida'
                            />
                          </button>
                          <button
                            type='button'
                            onClick={() =>
                              handleHighlightQuestion(question.id)
                            }>
                            <img
                              src={answerImg}
                              alt='Dar destaque à pergunta'
                            />
                          </button>
                        </>
                      )}
                      <button
                        type='button'
                        onClick={() => setIsDeleteQuestionModalOpen(true)}>
                        <img src={deleteImg} alt='Remover pergunta' />
                      </button>
                      <Modal
                        isOpen={isDeleteQuestionModalOpen}
                        icon={deleteImgRed}
                        title='Excluir pergunta'
                        message='Tem certeza que você deseja excluir essa pergunta?'
                        onConfirm={() => handleDeleteQuestion(question.id)}
                        onCancel={() => setIsDeleteQuestionModalOpen(false)}
                      />
                    </Question>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminRoom;
