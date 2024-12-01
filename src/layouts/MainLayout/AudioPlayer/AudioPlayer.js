import styles from "./AudioPlayer.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAudioPlayer } from "~/components/AudioPlayerProvider";

import Player from "~/components/Player";

function AudioPlayer() {
  const {
    isPlaying,
    playerRefs,
    currentTrackId,
    currentTrack,
    trackLink,
    handlePlay,
    handlePause,
    handleNextTrack,
    handlePrevTrack,
    handleLoop,
    handleRandomTrack,
    activeLoopClick,
    setActiveLoopClick,
    activeRandomClick,
    setActiveRandomClick,
  } = useAudioPlayer();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isPlaying && playerRefs.current) {
      playerRefs.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("frame")}>
        <Player
          trackId={currentTrackId}
          trackTitle={currentTrack?.trackTitle || `${t("unknownTitle")}`}
          trackPerformer={
            currentTrack?.trackPerformer || `${t("unknownPerformer")}`
          }
          trackLink={trackLink}
          trackType={currentTrack?.trackType || "Unknown Type"}
          isStatus={!!currentTrackId && isPlaying}
          onPlay={() => handlePlay(currentTrackId, currentTrack, trackLink)}
          onPause={handlePause}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
          onLoop={handleLoop}
          onRandom={handleRandomTrack}
          activeLoopClick={activeLoopClick}
          setActiveLoopClick={setActiveLoopClick}
          activeRandomClick={activeRandomClick}
          setActiveRandomClick={setActiveRandomClick}
          //
          frameFooterResize
          playerFooterResize
          playerFooterBtn
          playFooterIcon
          stopperFooterBtn
          stopFooterIcon
          waveformBoxFooter
          footerInfo
          playTimeFooter
          actionsFooter
          actionsFooterLeft
          actionsFooterRight
          //
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
