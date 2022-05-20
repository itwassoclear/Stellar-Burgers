import { FC } from "react";
import styles from "./modal-overlay.module.css";

type TModal = {
  onClose: () => void;
};

const ModalOverlay: FC<TModal> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose} />;
};

export default ModalOverlay;
