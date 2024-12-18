import classNames from "classnames/bind";
import styles from "./NewReleasesBox.module.scss";

import { useAudioPlayer } from "../AudioPlayerProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faInfo } from "@fortawesome/free-solid-svg-icons";

import routesConfig from "~/config/routes";
import { Link } from "react-router-dom";

import Player from "../Player";
import TrackPopper from "~/layouts/MainLayout/Popper/TrackPopper";
import YourPlaylistCheck from "../YourPlaylistCheck";

const cx = classNames.bind(styles);

function NewReleasesBox({
  trackId,
  trackLink,
  trackTitle,
  trackPerformer,
  trackAvatar,
  trackType,
  trackGenre,
  releaseDay,
  streamed,
}) {
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    isPlaying,
    setActiveRandomClick,
  } = useAudioPlayer();

  const handlePlayTrack = () => {
    handlePlay(trackId, { trackTitle, trackPerformer }, trackLink);
    setActiveRandomClick(true);
  };

  const formatStreamed = () => {
    if (streamed < 1000) {
      return streamed;
    } else if (streamed >= 1000 && streamed < 1000000) {
      const thousands = Math.floor(streamed / 1000);
      const hundreds = Math.floor((streamed % 1000) / 100);

      if (thousands < 1000) {
        if (hundreds > 0) {
          return (
            <>
              &asymp; {thousands}K{hundreds}
            </>
          );
        } else {
          return `${thousands}K`;
        }
      }
    } else if (streamed >= 1000000) {
      const millions = Math.floor(streamed / 1000000);
      return <>&asymp; {millions}M</>;
    }
  };

  return (
    <div className={cx("container")}>
      <Link
        className={cx("link")}
        to={routesConfig.track
          .replace(`:stageName`, trackPerformer)
          .replace(`:trackTitle`, trackTitle)}
      />

      <div className={cx("player")}>
        <img className={cx("avatar")} src={trackAvatar} alt={trackTitle} />

        <Player
          trackId={trackId}
          trackLink={trackLink}
          trackTitle={trackTitle}
          trackPerformer={trackPerformer}
          trackType={trackType}
          //
          isStatus={trackId === currentTrackId && isPlaying}
          onPlay={handlePlayTrack}
          onPause={() => handlePause(trackId)}
        />

        <div className={cx("menu")}>
          <div className={cx("streams")}>
            <FontAwesomeIcon className={cx("headphone")} icon={faHeadphones} />
            <div className={cx("listens")}>
              <h6 className={cx("listener")}>{formatStreamed(streamed)}</h6>
            </div>
          </div>

          <TrackPopper
            trackPerformer={trackPerformer}
            trackTitle={trackTitle}
            trackType={trackType}
            trackGenre={trackGenre}
            releaseDay={releaseDay}
          >
            <div className={cx("info")}>
              <FontAwesomeIcon className={cx("icon")} icon={faInfo} />
            </div>
          </TrackPopper>

          <div className={cx("your-playlist")}>
            <YourPlaylistCheck
              trackId={trackId}
              trackAvatar={trackAvatar}
              trackTitle={trackTitle}
              trackPerformer={trackPerformer}
              trackLink={trackLink}
              trackGenre={trackGenre}
              trackType={trackType}
              releaseDay={releaseDay}
              streamed={streamed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewReleasesBox;
