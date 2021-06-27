import React from 'react';
import cx from 'classnames';

import './modal.scss';

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  icon: string;
  noConfirmButtons?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
};

const Modal = ({
  isOpen,
  title,
  message,
  icon,
  noConfirmButtons,
  onConfirm,
  onCancel,
}: ModalProps) => {
  return (
    <>
      <div
        className={cx('modal-overlay', { open: isOpen })}
        onClick={onCancel}
      />
      <div className={cx('modal-container', { open: isOpen })}>
        <div>
          <img src={icon} alt='Modal icon' />
        </div>
        <h3>{title}</h3>
        <span>{message}</span>
        <div className='modal-button-container'>
          {!noConfirmButtons ? (
            <>
              <button onClick={onCancel}>Cancelar</button>
              <button onClick={onConfirm}>Confirmar</button>
            </>
          ) : (
            <button onClick={onCancel}>Ok</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
