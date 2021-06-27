import React from 'react';
import cx from 'classnames';

import './question.scss';

import AnonymousProfile from '../../assets/images/anonymous-user.png';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: React.ReactNode;
  isAnswered: boolean;
  isHighlighted: boolean;
  isAnonymous: boolean;
};

const Question = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
  isAnonymous = false,
}: QuestionProps) => {
  return (
    <div
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered },
      )}>
      <p>{content}</p>
      <footer>
        <div className='user-info'>
          <img
            src={!isAnonymous ? author.avatar : AnonymousProfile}
            alt={author.name}
          />
          <span>{!isAnonymous ? author.name : 'Autor Anônimo'}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
};

export default Question;
