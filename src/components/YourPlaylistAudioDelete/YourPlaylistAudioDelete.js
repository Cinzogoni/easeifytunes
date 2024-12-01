import classNames from "classnames/bind";
import styles from "./YourPlaylistAudioDelete.module.scss";
const cx = classNames.bind(styles);

import { useYourPlaylist } from "../YourPlaylistProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function YourPlaylistAudioDelete({ playlistIndex, audioIndex, trackId }) {
  const { activeDelete, setActiveDelete, handleDeleteAudioTrack } =
    useYourPlaylist();

  const handleDelAudioTrack = (id, playlistInx, audioInx) => {
    setActiveDelete(trackId);
    setTimeout(() => {
      handleDeleteAudioTrack(id, playlistInx, audioInx);
    }, 100);
  };

  useEffect(() => {
    // console.log("Playlist Index:", playlistIndex);
    // console.log("Audio Index:", audioIndex);
  }, [playlistIndex, audioIndex]);

  return (
    <div
      className={cx("wrapper")}
      onClick={() => handleDelAudioTrack(trackId, playlistIndex, audioIndex)}
      style={{
        backgroundColor:
          activeDelete === trackId ? "rgba(255, 255, 255, 1)" : "transparent",
      }}
    >
      <FontAwesomeIcon
        className={cx("delete-check")}
        icon={faRemove}
        style={{
          color:
            activeDelete === trackId
              ? "rgba(12, 12, 20,1)"
              : "rgba(255, 255, 255, 1)",
        }}
      />
    </div>
  );
}

export default YourPlaylistAudioDelete;
