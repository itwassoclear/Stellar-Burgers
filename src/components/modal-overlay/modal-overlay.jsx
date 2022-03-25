// фоновая подложка под модальным окном.
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay(props) {
  const { onClose } = props;

  return (
    <div className={styles.overlay} onClick={onClose} />
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
};

export default ModalOverlay;
