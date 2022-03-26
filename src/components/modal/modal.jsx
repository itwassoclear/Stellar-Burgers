import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = (props) => {
  const { children, header, onClose } = props;
  const modalRoot = document.getElementById('modal');

  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [onClose])

  return (
    ReactDOM.createPortal(
      <>
        <ModalOverlay onClose={onClose} />
        <div className={clsx(styles.modal, 'pl-10 pr-10 pt-10')}>
          <div className={styles.header}>
            <div className="text text_type_main-large">{header}</div>
            <div className={styles.closeIcon} onClick={onClose}>
              <CloseIcon type="primary" />
            </div>
          </div>
          {children}
        </div>
      </>,
      modalRoot
    )
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
