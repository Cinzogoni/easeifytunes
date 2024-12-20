import classNames from "classnames/bind";
import styles from "./PlaylistModeInfo.module.scss";
const cx = classNames.bind(styles);

import { useAudioPlayer } from "../AudioPlayerProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function PlaylistModeInfo({ defaultTitle }) {
  const { t } = useTranslation();
  const { handleMemo, activeMemo, storedTrackListMap, trackList } =
    useAudioPlayer();
  const storedTrackArray = Array.from(storedTrackListMap.values()).flatMap(
    (item) => item.trackList
  );

  const titleValue = storedTrackArray[0];
  const activeTitle = titleValue?.name || titleValue?.topic;

  useEffect(() => {
    // console.log(trackList);
  }, [trackList, storedTrackArray, activeMemo]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("info")}>
          <h1 className={cx("title")}>
            {!defaultTitle
              ? `${t("playlistModeCurrent")}: ${t("playlistNameNull")}`
              : activeMemo
              ? `${t("playlistModePinned")}: ${activeTitle}`
              : `${t("playlistModeCurrent")}: ${defaultTitle}`}
          </h1>
        </div>

        <div className={cx("action")}>
          <div
            className={cx("bg")}
            onClick={handleMemo}
            style={{
              backgroundColor: activeMemo
                ? "rgba(255, 255, 255, 1)"
                : "transparent",
              backgroundImage: activeMemo
                ? "linear-gradient(to top, rgba(102, 128, 150, 0.1) 30%, rgba(58, 123, 189, 0.2) 50%, rgba(145, 187, 229, 0.1) 100%)"
                : undefined,
            }}
          >
            <FontAwesomeIcon
              className={cx("memo")}
              icon={faThumbTack}
              style={{
                color: activeMemo
                  ? "rgb(12, 12, 20)"
                  : "rgba(255, 255, 255, 1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistModeInfo;
