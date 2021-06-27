import React from 'react';

import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
};

const RoomCode = ({ code }: RoomCodeProps) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className='room-code' onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt='Copy room code' />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
};

export default RoomCode;
