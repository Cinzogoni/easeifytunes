import classNames from "classnames/bind";
import styles from "./YourPlaylist.module.scss";
const cx = classNames.bind(styles);

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../UserProvider";
import { useSearchFocus } from "../SearchFocusProvider/SearchFocusProvider";
import { useModal } from "../ModalProvider";
import { useYourPlaylist } from "../YourPlaylistProvider";

import YourPlaylistBox from "../YourPlaylistBox";

function YourPlaylist({
  setIsVisible,
  setShowPlaylist,
  setActivePlaylist,
  handlePlaylist,
  caretNone,
  yourPlaylistNone,
}) {
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const { focus } = useSearchFocus();
  const { openLoginModal } = useModal();
  const { activePlaylist, showPlaylist, showNotify, isVisible } =
    useYourPlaylist();

  useEffect(() => {
    if (focus) {
      setIsVisible(false);
      setShowPlaylist(false);
      setActivePlaylist(false);
    }
  }, [focus]);

  const handleLogin = (e) => {
    setIsVisible(false);
    setTimeout(() => {
      openLoginModal();
    }, 100);
  };

  return (
    <div className={cx("playlists")}>
      <div
        className={cx("your-playlist", { yourPlaylistNone })}
        onClick={handlePlaylist}
        style={{
          backgroundColor:
            activePlaylist && !focus ? "rgba(255, 255, 255, 1)" : "transparent",
          backgroundImage:
            !activePlaylist && !focus
              ? "linear-gradient(to top, rgba(102, 128, 150, 0.2) 30%, rgba(58, 123, 189, 0.4) 50%, rgba(145, 187, 229, 0.2) 100%)"
              : undefined,
        }}
      >
        <FontAwesomeIcon
          className={cx("caret-right", { caretNone })}
          icon={faCaretRight}
          style={{
            color:
              activePlaylist && !focus
                ? "rgb(12, 12, 20)"
                : "rgba(255, 255, 255, 1)",
            transform: activePlaylist ? "rotate(-90deg)" : "rotate(0)",
            transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
          }}
        />
        <FontAwesomeIcon
          className={cx("playlist-check")}
          icon={faListCheck}
          style={{
            color:
              activePlaylist && !focus
                ? "rgb(12, 12, 20)"
                : "rgba(255, 255, 255, 1)",
          }}
        />
      </div>

      {isVisible && (
        <div className={cx("show-yourPlaylist")}>
          {currentUser
            ? showPlaylist && !focus && <YourPlaylistBox />
            : showNotify && (
                <div className={cx("yourPlaylist-note")}>
                  {t("yourPlaylistLogin")}
                  <p className={cx("login")} onClick={handleLogin}>
                    <strong>{t("loginNow")}</strong>
                  </p>
                </div>
              )}
        </div>
      )}
    </div>
  );
}

export default YourPlaylist;
