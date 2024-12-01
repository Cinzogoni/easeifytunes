import classNames from "classnames/bind";
import styles from "./PopUp.module.scss";
const cx = classNames.bind(styles);

import { useRef, useEffect } from "react";
import { useYourPlaylist } from "../YourPlaylistProvider";

function PopUp({ children, isOpen, closePopUp }) {
  const { setIsVisible, setShowPlaylist, setActivePlaylist } =
    useYourPlaylist();

  const popUpRef = useRef();

  if (!isOpen) return null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        closePopUp();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopUp]);

  return (
    <div className={cx("popUp")}>
      <div className={cx("content")} ref={popUpRef}>
        {children}
      </div>
    </div>
  );
}

export default PopUp;
