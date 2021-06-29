import React from 'react';

import copyImg from '../../assets/images/copy.svg';
import copyImgDark from '../../assets/images/copy-dark.svg';

import { useTheme } from '../../hooks/useTheme';

import './room-code.scss';

type RoomCodeProps = {
  code: string;
};

const RoomCode = ({ code }: RoomCodeProps) => {
  const { isInDarkTheme } = useTheme();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button className='room-code' onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={isInDarkTheme ? copyImgDark : copyImg} alt='Copy room code' />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
};

export default RoomCode;
