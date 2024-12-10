import { useRef, useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./Player.module.scss";
const cx = classNames.bind(styles);

import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { useAudioPlayer } from "../AudioPlayerProvider";
import { useSearchFocus } from "../SearchFocusProvider/SearchFocusProvider";
import { useYourPlaylist } from "../YourPlaylistProvider";

import routesConfig from "~/config/routes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardFast,
  faForwardFast,
  faPause,
  faPlay,
  faRotate,
  faShuffle,
  faStop,
  faVolumeHigh,
  faCircle,
  faCompactDisc,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";

import PlaylistMode from "../PlaylistMode";
import YourPlaylist from "../YourPlaylist";

const Player = ({
  trackId,
  trackTitle,
  trackPerformer,
  trackType,
  //
  isStatus,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onLoop,
  onRandom,
  activeLoopClick,
  setActiveLoopClick,
  activeRandomClick,
  setActiveRandomClick,
  // Trending Songs
  frameResize,
  playerResize,
  playBtn,
  playIcon,
  stopBtn,
  stopIcon,
  waveformBox,
  // Footer
  frameFooterResize,
  playerFooterResize,
  playerFooterBtn,
  playFooterIcon,
  stopperFooterBtn,
  stopFooterIcon,
  waveformBoxFooter,
  footerInfo,
  playTimeFooter,
  actionsFooterLeft,
  actionsFooterRight,
  //TrackInfo
  frameTrackInfoResize,
  playerTrackInfoResize,
  playtimeTrackInfo,
  randomTrackInfo,
  actionTrackInfoLeft,
  actionTrackInfoRight,
  prevTrackInfo,
  nextTrackInfo,
  loopTrackInfo,
  loopBGTrackInfo,
  pauseTrackInfo,
  pauseBGTrackInfo,
  playerTrackInfo,
  playIconTrackInfo,
  stopperTrackInfo,
  stopIconTrackInfo,
  volumeBarTrackInfo,
  volumeBGTrackInfo,
  volumeIconTrackInfo,
  //Single Tracks
  frameSingleTracks,
  playerSingleTracks,
  waveformBoxSingleTracks,
  stopperSingleTracks,
  //AlbumList
  playerAlbumList,
  stopperAlbumList,
  actionsAlbumList,
  hideAlbumList,
  //AlbumInfo
  playerAlbumInfo,
  playerAlbumInfoResize,
  actionsAlbumInfo,
  hideAlbumInfo,
  frameAlbumInfo,
  spaceAlbumInfo,
  //Podcast
  framePodcastResize,
  playerPodcastList,
  stopperPodcastList,
}) => {
  const {
    playerRefs,
    setCurrentTrackId,
    setCurrentTrack,
    handleStop,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    isTrackEnded,
    setIsTrackEnded,
    trackIndex,
    trackList,
  } = useAudioPlayer();
  const { t } = useTranslation();
  const { focus } = useSearchFocus();

  const {
    setActivePlaylist,
    setShowPlaylist,
    setIsVisible,
    setShowNotify,
    handleToggleYourPlaylist,
    setIsNewReleasesVisible,
    setActiveNewReleasesPlaylist,
    setShowNewReleasesPlaylist,
    setShowNewReleasesNotify,
  } = useYourPlaylist();

  const [show, setShow] = useState(false);
  const [activeClick, setActiveClick] = useState(null);

  const [activeModeList, setActiveModeList] = useState(false);
  const [showPlaylistMode, setShowPlaylistMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltip1, setShowTooltip1] = useState(false);

  const timeStartRef = useRef(null);
  const timeEndRef = useRef(null);
  const timingBarRef = useRef(null);
  const volumeBarRef = useRef(null);
  const randomTrackBgRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const linkToTrack = routesConfig.track
    .replace(`:stageName`, trackPerformer)
    .replace(`:trackTitle`, trackTitle);

  const linkToPodcast = routesConfig.podcastAudioPage
    .replace(`:publisher`, trackPerformer)
    .replace(`:title`, trackTitle);

  const chooseLink = !trackType
    ? null
    : trackType === "Podcast"
    ? linkToPodcast
    : trackType === "Album" || trackType === "Single"
    ? linkToTrack
    : linkToTrack;

  const handlePlaylistMode = () => {
    if (trackList.length < 1) {
      setIsVisible(false);
      setActivePlaylist(false);
      setShowPlaylist(false);
      setShowNotify(false);

      setIsNewReleasesVisible(false);
      setActiveNewReleasesPlaylist(false);
      setShowNewReleasesPlaylist(false);
      setShowNewReleasesNotify(false);

      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 1500);
    } else if (trackList.length > 0) {
      setIsVisible(false);
      setShowPlaylist(false);
      setActivePlaylist(false);
      setShowNotify(false);

      setIsNewReleasesVisible(false);
      setActiveNewReleasesPlaylist(false);
      setShowNewReleasesPlaylist(false);
      setShowNewReleasesNotify(false);

      setActiveModeList((prev) => !prev);
      setShowPlaylistMode((prev) => !prev);
    } else {
      setShowPlaylist(false);
      setActivePlaylist(false);
      setShowNotify(false);

      setIsNewReleasesVisible(false);
      setActiveNewReleasesPlaylist(false);
      setShowNewReleasesPlaylist(false);
      setShowNewReleasesNotify(false);

      setShowTooltip1(true);
      setTimeout(() => {
        setShowTooltip1(false);
      }, 1500);
    }
  };

  const handlePlaylist = () => {
    setShowPlaylistMode(false);
    setActiveModeList(false);
    setShowTooltip(false);
    setShowTooltip1(false);
    handleToggleYourPlaylist();
  };

  useEffect(() => {
    if (focus) {
      setActiveModeList(false);
      setShowPlaylistMode(false);
    }
  }, [focus]);

  useEffect(() => {
    // console.log("Player:");
    // console.log("Track list:", trackList);
    // console.log("Track index:", trackIndex);
  }, [trackList, trackIndex]);

  useEffect(() => {
    const player = playerRefs.current;

    const loadedMetadata = () => {
      if (timeEndRef.current) {
        timeEndRef.current.innerHTML = formatTime(player.duration);
        setDuration(player.duration);
      }
    };

    const timeUpdate = () => {
      if (timeStartRef.current) {
        timeStartRef.current.innerHTML = formatTime(player.currentTime);
        setCurrentTime(player.currentTime);
      }
    };

    player.addEventListener("loadedmetadata", loadedMetadata);
    player.addEventListener("timeupdate", timeUpdate);

    return () => {
      player.removeEventListener("loadedmetadata", loadedMetadata);
      player.removeEventListener("timeupdate", timeUpdate);
    };
  }, [playerRefs, setCurrentTime, currentTime, setDuration, duration]);

  useEffect(() => {
    // console.log(trackTitle, trackPerformer, trackType, chooseLink);
  }, [trackTitle, trackPerformer, trackType, chooseLink]);

  const handlePlayClick = (id) => {
    if (id) {
      setCurrentTrackId(id);
      setCurrentTrack(trackList[trackIndex]);
    }

    onPlay();
    setTimeout(() => {
      setIsTrackEnded(false);
      setShow(true);
    }, 100);
    // console.log("The track is playing!");
  };

  const handlePauseClick = () => {
    onPause();
    setTimeout(() => {
      setIsTrackEnded(true);
      setShow(false);
    }, 100);
    // console.log("The track has paused!");
  };

  const handleStopClick = () => {
    handleStop();
    setActiveClick("stopClick-bg");
    setTimeout(() => {
      setIsTrackEnded(true);
      setShow(false);
    }, 100);
    setTimeout(() => {
      setActiveClick(null);
    }, 250);
    // console.log("The track has stopped and reset!");
  };

  const handleRandomClick = () => {
    if (trackList.length > 1) {
      const newActiveClick = !activeRandomClick;
      setActiveRandomClick(newActiveClick);
      onRandom(newActiveClick);
    }
  };

  const handleLoopClick = () => {
    const newActiveState = !activeLoopClick;
    setActiveLoopClick(newActiveState);
    onLoop(newActiveState);
  };

  const handleNextClick = () => {
    const nextIndex = (trackIndex + 1) % trackList.length;
    const nextTrack = trackList[nextIndex];

    if (trackList.length > 1) {
      handlePlayClick(nextTrack.id);
      onNext();
      setActiveClick("nextTrack-bg");
      setTimeout(() => {
        setShow(true);
        setIsTrackEnded(false);
        setActiveClick(null);
      }, 250);
      // console.log("Next Track!");
    }
  };

  const handlePrevClick = () => {
    const prevIndex = (trackIndex - 1 + trackList.length) % trackList.length;
    const prevTrack = trackList[prevIndex];

    if (trackList.length > 1) {
      handlePlayClick(prevTrack.id);
      onPrev();
      setIsTrackEnded(false);
      setActiveClick("prevTrack-bg");
      setTimeout(() => {
        setShow(true);
        setIsTrackEnded(false);
        setActiveClick(null);
      }, 250);
      // console.log("Prev Track!");
    }
  };

  const handleVolumeChange = (e) => {
    const bar = volumeBarRef.current;
    const position = bar.getBoundingClientRect();
    const offsetX = e.clientX - position.left;
    const pointVolume = Math.min(Math.max(offsetX / position.width, 0), 1);
    setVolume(pointVolume);
    playerRefs.current.volume = pointVolume;
  };

  const handleTimingChange = (e) => {
    const timeBar = timingBarRef.current;
    const positionTime = timeBar.getBoundingClientRect();
    const offsetX = e.clientX - positionTime.left;
    const pointTime = Math.min(Math.max(offsetX / positionTime.width, 0), 1);
    const selectTime = pointTime * playerRefs.current.duration;
    setCurrentTime(selectTime);
    playerRefs.current.currentTime = selectTime;
  };

  const handleMouseDownVolume = (e) => {
    handleVolumeChange(e);
    document.addEventListener("mousemove", handleVolumeChange);
    document.addEventListener("mouseup", handleMouseUpVolume);
  };

  const handleMouseUpVolume = () => {
    document.removeEventListener("mousemove", handleVolumeChange);
    document.removeEventListener("mouseup", handleMouseUpVolume);
  };

  const handleMouseDownTiming = (e) => {
    handleTimingChange(e);
    document.addEventListener("mousemove", handleTimingChange);
    document.addEventListener("mouseup", handleMouseUpTiming);
  };

  const handleMouseUpTiming = () => {
    document.removeEventListener("mousemove", handleTimingChange);
    document.removeEventListener("mouseup", handleMouseUpTiming);
  };

  return (
    <div
      className={cx(
        "frame",
        {
          show: show && isStatus && !isTrackEnded,
        },
        { frameResize },
        { frameFooterResize },
        { frameTrackInfoResize },
        { frameSingleTracks },
        { frameAlbumInfo },
        { framePodcastResize }
      )}
    >
      {/* AudioPlayer Footer */}
      <div className={cx("info", { footerInfo })}>
        <div
          className={cx("list-mode")}
          onClick={handlePlaylistMode}
          style={{
            backgroundColor:
              activeModeList && !focus
                ? "rgba(255, 255, 255, 1)"
                : "transparent",
            backgroundImage:
              !activeModeList && !focus
                ? "linear-gradient(to top, rgba(102, 128, 150, 0.2) 30%, rgba(58, 123, 189, 0.4) 50%, rgba(145, 187, 229, 0.2) 100%)"
                : undefined,
          }}
        >
          <FontAwesomeIcon
            className={cx("disc")}
            icon={faCompactDisc}
            style={{
              color:
                activeModeList && !focus
                  ? "rgb(12, 12, 20)"
                  : "rgba(255, 255, 255, 1)",
            }}
          />
          <FontAwesomeIcon
            className={cx("caret-left")}
            icon={faCaretLeft}
            style={{
              color:
                activeModeList && !focus
                  ? "rgb(12, 12, 20)"
                  : "rgba(255, 255, 255, 1)",
              transform: activeModeList ? "rotate(90deg)" : "rotate(0)",
              transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
            }}
          />
        </div>

        <div className={cx("show-list")}>
          {showTooltip && (
            <div className={cx("list-note")}>
              <p className={cx("mode-notify")}>{t("tooltip")}</p>
            </div>
          )}
          {showTooltip1 && (
            <div className={cx("list-note")}>
              <p className={cx("mode-notify")}>{t("tooltip1")}</p>
            </div>
          )}
          {showPlaylistMode && !focus && <PlaylistMode />}
        </div>

        <div className={cx("sign")}>
          {trackTitle && trackPerformer && (
            <h6 className={cx("title")}>
              <Link to={chooseLink}>{`${trackTitle} - ${trackPerformer}`}</Link>
            </h6>
          )}
        </div>

        <YourPlaylist
          setIsVisible={setIsVisible}
          setShowPlaylist={setShowPlaylist}
          setActivePlaylist={setActivePlaylist}
          handlePlaylist={handlePlaylist}
        />
      </div>

      {/* AudioPlayer Footer */}
      <div
        className={cx("play-time", { playTimeFooter }, { playtimeTrackInfo })}
      >
        <h6 className={cx("time-start")} ref={timeStartRef}>
          {formatTime(currentTime)}
        </h6>

        <div
          className={cx("time-bar")}
          ref={timingBarRef}
          onMouseDown={handleMouseDownTiming}
        >
          <div
            className={cx("timing")}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div
            className={cx("point-bg")}
            style={{
              position: `absolute`,
              left: `${(currentTime / duration) * 98}%`,
            }}
          >
            <FontAwesomeIcon className={cx("breakpoint")} icon={faCircle} />
          </div>
        </div>

        <h6 className={cx("time-end")} ref={timeEndRef}>
          {formatTime(duration)}
        </h6>
      </div>
      {/* ---------------- */}

      <div
        className={cx(
          "player",
          { playerResize },
          { playerFooterResize },
          { playerTrackInfoResize },
          { playerSingleTracks },
          { playerAlbumInfoResize },
          { playerPodcastList }
        )}
      >
        {isStatus && !isTrackEnded && (
          <div
            className={cx(
              "waveform-box",
              { waveformBox },
              { waveformBoxFooter },
              { waveformBoxSingleTracks }
            )}
          >
            <div className={cx("waveform")}>
              <div className={cx("stroke-left")}></div>
              <div className={cx("stroke-left")}></div>
              <div className={cx("stroke-left")}></div>
              <div className={cx("stroke-left")}></div>
              <div className={cx("stroke-left")}></div>
              <div className={cx("stroke-left")}></div>
            </div>
          </div>
        )}

        {/* AudioPlayer Footer */}
        <div
          className={cx(
            "actions",
            { actionsFooterLeft },
            { actionTrackInfoLeft },
            { actionsAlbumList },
            { actionsAlbumInfo }
          )}
        >
          <div
            ref={randomTrackBgRef}
            className={cx(
              "randomTrack-bg",
              { randomTrackInfo },
              { hideAlbumList },
              { spaceAlbumInfo }
            )}
            onClick={handleRandomClick}
            style={{
              backgroundColor: activeRandomClick
                ? "transparent"
                : "rgba(255, 255, 255, 0.2)",
              border: activeRandomClick
                ? "1px solid transparent"
                : "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <FontAwesomeIcon
              className={cx("actions-footer")}
              icon={faShuffle}
            />
          </div>

          <div
            className={cx(
              "loopTrack-bg",
              { loopBGTrackInfo },
              { hideAlbumList },
              { spaceAlbumInfo }
            )}
            style={{
              backgroundColor: activeLoopClick
                ? "transparent"
                : " rgba(255, 255, 255, 0.2)",
              border: activeLoopClick
                ? "1px solid transparent"
                : "1px solid rgba(255, 255, 255, 0.2)",
              transition: "transform 0.5s linear",
              transform: activeLoopClick ? "rotate(0deg)" : "rotate(360deg)",
            }}
            onClick={handleLoopClick}
          >
            <FontAwesomeIcon
              className={cx(
                "actions-footer",
                { loopTrackInfo },
                { spaceAlbumInfo }
              )}
              icon={faRotate}
            />
          </div>

          <div
            className={cx(
              "stopClick-bg",
              { pauseBGTrackInfo },
              { hideAlbumList },
              { hideAlbumInfo }
            )}
            onClick={handleStopClick}
            style={{
              backgroundColor:
                activeClick === "stopClick-bg"
                  ? "rgba(255, 255, 255, 0.2"
                  : "transparent",
              border:
                activeClick === "stopClick-bg"
                  ? "1px solid rgba(255, 255, 255,0.2)"
                  : "1px solid transparent",
            }}
          >
            <FontAwesomeIcon
              className={cx(
                "actions-footer",
                { pauseTrackInfo },
                { hideAlbumInfo }
              )}
              icon={faPause}
            />
          </div>

          <button
            className={cx("prevTrack-bg", { prevTrackInfo }, { hideAlbumInfo })}
            onClick={handlePrevClick}
            style={{
              backgroundColor:
                activeClick === "prevTrack-bg"
                  ? "rgba(255, 255, 255, 0.2"
                  : "transparent",
              border:
                activeClick === "prevTrack-bg"
                  ? "1px solid rgba(255, 255, 255,0.2)"
                  : "1px solid transparent",
            }}
          >
            <FontAwesomeIcon
              className={cx("actions-footer")}
              icon={faBackwardFast}
            />
          </button>
        </div>
        {/* ---------------- */}
        {(!isStatus || isTrackEnded) && (
          <div
            className={cx(
              "player-btn",
              { playBtn },
              { playerFooterBtn },
              { playerTrackInfo },
              { playerAlbumList },
              { playerAlbumInfo }
            )}
            onClick={() => handlePlayClick(trackId)}
          >
            <div className={cx("play-box")}>
              <FontAwesomeIcon
                className={cx(
                  "play",
                  { playIcon },
                  { playFooterIcon },
                  { playIconTrackInfo }
                )}
                icon={faPlay}
              />
            </div>
          </div>
        )}

        {isStatus && !isTrackEnded && (
          <div
            className={cx(
              "stopper-btn",
              { stopBtn },
              { stopperFooterBtn },
              { stopperTrackInfo },
              {
                stopperSingleTracks,
              },
              { stopperAlbumList },
              { stopperPodcastList }
            )}
            onClick={handlePauseClick}
          >
            <div className={cx("stop-box")}>
              <FontAwesomeIcon
                className={cx(
                  "stop",
                  { stopIcon },
                  { stopFooterIcon },
                  { stopIconTrackInfo }
                )}
                icon={faStop}
              />
            </div>
          </div>
        )}

        {/* AudioPlayer Footer */}
        <div
          className={cx(
            "actions",
            { actionsFooterRight },
            { actionTrackInfoRight },
            { actionsAlbumList },
            { actionsAlbumInfo },
            { hideAlbumInfo }
          )}
        >
          <button
            className={cx("nextTrack-bg", { nextTrackInfo })}
            onClick={handleNextClick}
            style={{
              backgroundColor:
                activeClick === "nextTrack-bg"
                  ? "rgba(255, 255, 255, 0.2"
                  : "transparent",
              border:
                activeClick === "nextTrack-bg"
                  ? "1px solid rgba(255, 255, 255,0.2)"
                  : "1px solid transparent",
            }}
          >
            <FontAwesomeIcon
              className={cx("actions-footer")}
              icon={faForwardFast}
            />
          </button>

          <div
            className={cx(
              "volume-bg",
              { volumeBGTrackInfo },
              { hideAlbumList }
            )}
          >
            <FontAwesomeIcon
              className={cx("actions-footer", { volumeIconTrackInfo })}
              icon={faVolumeHigh}
            />
          </div>

          <div
            className={cx(
              "volume-bar",
              { volumeBarTrackInfo },
              { hideAlbumList }
            )}
            ref={volumeBarRef}
            onMouseDown={handleMouseDownVolume}
          >
            <div
              className={cx("volume-line")}
              style={{
                width: `${volume * 100}%`,
              }}
            />

            <div
              className={cx("volume-dot")}
              style={{
                position: `absolute`,
                left: `${volume * 100}%`,
              }}
            >
              <FontAwesomeIcon className={cx("volume-point")} icon={faCircle} />
            </div>
          </div>
        </div>
        {/* ---------------- */}
        {isStatus && !isTrackEnded && (
          <div
            className={cx(
              "waveform-box",
              { waveformBox },
              { waveformBoxFooter },
              { waveformBoxSingleTracks }
            )}
          >
            <div className={cx("waveform")}>
              <div className={cx("stroke-right")}></div>
              <div className={cx("stroke-right")}></div>
              <div className={cx("stroke-right")}></div>
              <div className={cx("stroke-right")}></div>
              <div className={cx("stroke-right")}></div>
              <div className={cx("stroke-right")}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
