import classNames from "classnames/bind";
import styles from "./YourPlaylistAudiosList.module.scss";
const cx = classNames.bind(styles);

import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faLink } from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "../AudioPlayerProvider";
import { useUser } from "../UserProvider";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import Player from "../Player";
import YourPlaylistAudioDelete from "../YourPlaylistAudioDelete";

function YourPlaylistAudiosList({ audioList, playlistIndex }) {
  const { currentUser } = useUser();
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    handleLoop,
    handleNextTrack,
    handlePrevTrack,
    handleRandomTrack,
    activeLoopClick,
    setActiveLoopClick,
    activeRandomClick,
    setActiveRandomClick,
    isRandom,
    isTrackEnded,
    setTrackIndex,
    setTrackList,
    setShuffledTrackList,
    shuffledTrackList,
    setStoredTrackListMap,
    activeMemo,
    setActiveMemo,
  } = useAudioPlayer();

  const trackRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const shuffleArray = (array) => {
    const shuffledArray = array.filter(
      (track) => track.trackId !== currentTrackId
    );
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    if (currentTrackId) {
      const currentTrack = array.find(
        (track) => track.trackId === currentTrackId
      );
      if (currentTrack) {
        shuffledArray.unshift(currentTrack);
      }
    }

    return shuffledArray;
  };

  useEffect(() => {
    if (audioList.length > 0) {
      setTrackList(audioList);
      if (isRandom) {
        const shuffledList = shuffleArray(audioList);
        setShuffledTrackList(shuffledList);
      }
    }
    // console.log("Audio tracks:", audioList);
  }, [audioList, isRandom, setTrackList, setShuffledTrackList]);

  const displayTrackList = isRandom ? shuffledTrackList : audioList;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const index = currentTrackId
      ? displayTrackList.findIndex((track) => track.trackId === currentTrackId)
      : -1;

    setTrackIndex(index);

    if (!isScrolling && index !== -1 && trackRefs.current[index]) {
      trackRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    // console.log("Track List:", displayTrackList);
  }, [currentTrackId, displayTrackList, setTrackIndex]);

  useEffect(() => {
    if (!activeMemo) {
      setActiveMemo(false);
    }
    // console.log("AlbumList activeMemo:", activeMemo);
  }, [activeMemo]);

  const handleTrackPlay = (track) => {
    if (!activeMemo) {
      setStoredTrackListMap(new Map());
      setTrackList(displayTrackList);
    }

    setTrackIndex(displayTrackList.findIndex((t) => t.id === track.trackId));
    handlePlay(
      track.trackId,
      {
        trackTitle: track.trackTitle,
        trackPerformer: track.trackPerformer,
        trackType: track.trackType,
      },
      track.trackLink
    );
  };

  const handleTrackPause = (track) => {
    setTrackIndex(displayTrackList.findIndex((t) => t.id === track.trackId));
    handlePause(track.trackId);
  };

  const isLastTrack = (track) => {
    return displayTrackList[displayTrackList.length - 1]?.id === track.trackId;
  };

  return (
    <div className={cx("wrapper")}>
      {currentUser && (
        <div className={cx("container")}>
          <div className={cx("audio-tracks")}>
            {displayTrackList.map((audio, index) => (
              <div
                ref={(el) => (trackRefs.current[index] = el)}
                className={cx("audio-box", {
                  playing: audio.trackId === currentTrackId,
                  transparent: isTrackEnded && isLastTrack(audio),
                })}
                key={audio.trackId}
              >
                <div className={cx("player")}>
                  <img
                    className={cx("audio-avatar")}
                    src={audio.trackAvatar}
                    alt={audio.trackTitle}
                  />
                  <Player
                    trackId={audio.trackId}
                    trackLink={audio.trackLink}
                    trackAvatar={audio.trackAvatar}
                    trackTitle={audio.trackTitle}
                    trackPerformer={audio.trackPerformer}
                    trackType={audio.trackType}
                    //
                    isStatus={audio.trackId === currentTrackId}
                    onPlay={() => handleTrackPlay(audio)}
                    onPause={() => handleTrackPause(audio)}
                    onNext={handleNextTrack}
                    onPrev={handlePrevTrack}
                    onLoop={handleLoop}
                    onRandom={handleRandomTrack}
                    isRandom={isRandom}
                    activeLoopClick={activeLoopClick}
                    setActiveLoopClick={setActiveLoopClick}
                    activeRandomClick={activeRandomClick}
                    setActiveRandomClick={setActiveRandomClick}
                    //
                    frameSingleTracks
                    playerSingleTracks
                    waveformBoxSingleTracks
                    actionsAlbumList
                    hideAlbumList
                  />
                </div>

                <div className={cx("audio-info")}>
                  <Link
                    className={cx("audio-link")}
                    to={routesConfig.track
                      .replace(
                        `:stageName`,
                        audio.trackPerformer.replace(/\//g, "-")
                      )
                      .replace(
                        `:trackTitle`,
                        audio.trackTitle.replace(/\//g, "-")
                      )}
                  />

                  <h4 className={cx("audio-title")}>{audio.trackTitle}</h4>
                  <h5 className={cx("audio-performer")}>
                    {audio.trackPerformer}
                  </h5>
                </div>

                <div className={cx("more-func")}>
                  <div className={cx("streams")}>
                    <FontAwesomeIcon
                      className={cx("listeners")}
                      icon={faHeadphones}
                    />
                    <h5 className={cx("streamed")}>
                      {new Intl.NumberFormat().format(audio.streamed || 0)}
                    </h5>
                  </div>

                  <div className={cx("share")}>
                    <FontAwesomeIcon
                      className={cx("share-link")}
                      icon={faLink}
                    />
                  </div>

                  <div className={cx("delete-audio")}>
                    <YourPlaylistAudioDelete
                      trackId={audio.trackId}
                      audioIndex={index}
                      playlistIndex={playlistIndex}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default YourPlaylistAudiosList;
