import classNames from "classnames/bind";
import styles from "./TrendingSongsBox.module.scss";

import { useAudioPlayer } from "../AudioPlayerProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

import Player from "../Player";
import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";
import YourPlaylistCheck from "../YourPlaylistCheck";

const cx = classNames.bind(styles);
function TrendingSongsBox({ tracks }) {
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    isPlaying,
    setActiveRandomClick,
  } = useAudioPlayer();

  const formatStreamed = (streamed) => {
    if (streamed < 1000) {
      return streamed.toString();
    } else if (streamed >= 1000 && streamed < 1000000) {
      const thousands = Math.floor(streamed / 1000);
      const hundreds = Math.floor((streamed % 1000) / 100);

      if (thousands < 1000) {
        if (hundreds > 0) {
          return `≈ ${thousands}K${hundreds}`;
        } else {
          return `${thousands}K`;
        }
      }
    } else if (streamed >= 1000000) {
      const millions = Math.floor(streamed / 1000000);
      return `≈ ${millions}M`;
    }
  };

  const renderSongItem = (track) => {
    return (
      <div key={track.id} className={cx("song-item")}>
        <div className={cx("image")}>
          <img
            className={cx("avatar")}
            src={track.avatar || track.albumAvatar}
            alt={track.stageName}
          />

          <Player
            frameResize
            playerResize
            playBtn
            playIcon
            stopBtn
            stopIcon
            waveformBox
            //
            trackId={track.id}
            trackLink={track.link}
            trackTitle={track.title}
            trackPerformer={track.stageName}
            trackType={track.type}
            trackGenre={track.genre}
            releaseDay={track.releaseDay}
            //
            isStatus={track.id === currentTrackId && isPlaying}
            onPlay={() => {
              handlePlay(
                track.id,
                {
                  trackTitle: track.title,
                  trackPerformer: track.stageName,
                },
                track.link
              );
              setActiveRandomClick(true);
            }}
            onPause={() => handlePause(track.id)}
          />
        </div>

        <div className={cx("info")}>
          <h4 className={cx("title")}>{track.title}</h4>
          <h5 className={cx("performer")}>{track.stageName}</h5>

          <Link
            className={cx("link")}
            to={routesConfig.track
              .replace(":stageName", track.stageName)
              .replace(":trackTitle", track.title)}
          />
        </div>

        <div className={cx("menu")}>
          <div className={cx("streams")}>
            <FontAwesomeIcon className={cx("headphone")} icon={faHeadphones} />

            <div className={cx("listens")}>
              <h6 className={cx("listeners")}>
                {formatStreamed(track.streamed || 0)}
              </h6>
            </div>
          </div>

          <div className={cx("your-playlist")}>
            <YourPlaylistCheck
              trackId={`trend_${track.id}`}
              trackAvatar={track.avatar || track.albumAvatar}
              trackTitle={track.title}
              trackPerformer={track.stageName}
              trackLink={track.link}
              trackGenre={track.genre}
              trackType={track.type}
              streamed={track.streamed}
              releaseDay={track.releaseDay}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cx("song-box")}>
      <div className={cx("song-list")}>{tracks.map(renderSongItem)}</div>
    </div>
  );
}

export default TrendingSongsBox;
