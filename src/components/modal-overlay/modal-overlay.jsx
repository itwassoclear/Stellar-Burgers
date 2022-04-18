import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

function ModalOverlay(props) {
  const { onClose } = props;

  return (
    <div className={ styles.overlay } onClick={ onClose } />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
};

export default ModalOverlay;
