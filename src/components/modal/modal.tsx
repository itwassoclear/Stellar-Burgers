import { FC } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

import ModalOverlay from "../modal-overlay/modal-overlay";

type TModal = {
  header?: string;
  onClose: () => void;
};

const Modal: FC<TModal> = (props) => {
  const { children, header, onClose } = props;
  const modalRoot = document.getElementById("modal") as HTMLDivElement;

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={clsx(styles.modal, "pl-10 pr-10 pt-10")}>
        <div className={styles.header}>
          <div className='text text_type_main-large'>{header}</div>
          <div className={styles.closeIcon} onClick={onClose}>
            <CloseIcon type='primary' />
          </div>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
