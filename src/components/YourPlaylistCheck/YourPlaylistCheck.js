import classNames from "classnames/bind";
import styles from "./YourPlaylistCheck.module.scss";
const cx = classNames.bind(styles);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";

import { useYourPlaylist } from "../YourPlaylistProvider";
import { useSearchFocus } from "../SearchFocusProvider/SearchFocusProvider";
import { useUser } from "../UserProvider";
import { usePopUp } from "../PopUpProvider";

import Tippy from "@tippyjs/react";
import YourPlaylistBox from "../YourPlaylistBox";

function YourPlaylistCheck({
  trackId,
  trackAvatar,
  trackTitle,
  trackPerformer,
  trackLink,
  trackGenre,
  trackType,
  releaseDay,
  streamed,
  checkFix,
  positionFix,
}) {
  const { t } = useTranslation();
  const { focus } = useSearchFocus();
  const { currentUser } = useUser();
  const { openLoginPopUp } = usePopUp();
  const {
    setIsNewReleasesVisible,
    isNewReleasesVisible,
    activeNewReleasesPlaylist,
    showNewReleasesPlaylist,
    showNewReleasesNotify,
    handleToggleYourPlaylist1,
  } = useYourPlaylist();

  const handleLogin = () => {
    setIsNewReleasesVisible(false);
    setTimeout(() => {
      openLoginPopUp();
    }, 100);
  };

  return (
    <Tippy
      placement={showNewReleasesNotify ? "bottom" : "right"}
      interactive
      appendTo={document.body}
      visible={isNewReleasesVisible === trackId}
      render={(attrs) => (
        <div className={cx("frame", { positionFix })} tabIndex={-1} {...attrs}>
          {isNewReleasesVisible === trackId && (
            <div className={cx("box")}>
              {currentUser
                ? showNewReleasesPlaylist === trackId &&
                  !focus && (
                    <YourPlaylistBox
                      trackId={trackId}
                      trackAvatar={trackAvatar}
                      trackTitle={trackTitle}
                      trackPerformer={trackPerformer}
                      trackLink={trackLink}
                      trackGenre={trackGenre}
                      releaseDay={releaseDay}
                      trackType={trackType}
                      streamed={streamed}
                    />
                  )
                : showNewReleasesNotify && (
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
      )}
    >
      <div
        className={cx("add-yourPlaylist")}
        onClick={() => handleToggleYourPlaylist1(trackId)}
        style={{
          backgroundColor:
            activeNewReleasesPlaylist === trackId && !focus
              ? "rgba(255, 255, 255, 1)"
              : "transparent",
        }}
      >
        <FontAwesomeIcon
          className={cx("playlist-check", { checkFix })}
          icon={faListCheck}
          style={{
            color:
              activeNewReleasesPlaylist === trackId && !focus
                ? "rgba(12, 12, 20,1)"
                : "rgba(255, 255, 255, 1)",
          }}
        />
      </div>
    </Tippy>
  );
}

export default YourPlaylistCheck;
