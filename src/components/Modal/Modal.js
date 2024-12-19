import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
const cx = classNames.bind(styles);

import { useRef, useEffect } from "react";

function Modal({ children, isOpen, closeModal }) {
  const ModalRef = useRef();

  if (!isOpen) return null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ModalRef.current && !ModalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className={cx("Modal")}>
      <div className={cx("content")} ref={ModalRef}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
