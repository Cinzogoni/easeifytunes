import classNames from "classnames/bind";
import styles from "./AlbumList.module.scss";
const cx = classNames.bind(styles);

import { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faLink } from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "../AudioPlayerProvider";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import Player from "../Player";
import YourPlaylistCheck from "../YourPlaylistCheck";
import AudioShareLink from "../AudioShareLink";

function AlbumList({ trackList, avatar }) {
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
    const shuffledArray = array.filter((track) => track.id !== currentTrackId);
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    if (currentTrackId) {
      const currentTrack = array.find((track) => track.id === currentTrackId);
      if (currentTrack) {
        shuffledArray.unshift(currentTrack);
      }
    }

    return shuffledArray;
  };

  useEffect(() => {
    if (trackList.length > 0) {
      setTrackList(trackList);
      if (isRandom) {
        const shuffledList = shuffleArray(trackList);
        setShuffledTrackList(shuffledList);
      }
    }
  }, [trackList, isRandom, setTrackList, setShuffledTrackList]);

  const displayTrackList = isRandom ? shuffledTrackList : trackList;

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
      ? displayTrackList.findIndex((track) => track.id === currentTrackId)
      : -1;

    setTrackIndex(index);

    if (!isScrolling && index !== -1 && trackRefs.current[index]) {
      trackRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // console.log("Track List:", displayTrackList);
    // console.log("current track id:", currentTrackId);
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

    setTrackIndex(displayTrackList.findIndex((t) => t.id === track.id));
    handlePlay(
      track.id,
      {
        trackTitle: track.title,
        trackPerformer: track.stageName,
        trackType: track.type,
      },
      track.link
    );
  };

  const handleTrackPause = (track) => {
    setTrackIndex(displayTrackList.findIndex((t) => t.id === track.id));
    handlePause(track.id);
  };

  const isLastTrack = (track) => {
    return displayTrackList[displayTrackList.length - 1]?.id === track.id;
  };

  return (
    <div className={cx("container")}>
      <div className={cx("tracks")}>
        {displayTrackList.map((track, index) => (
          <div
            ref={(el) => (trackRefs.current[index] = el)}
            className={cx("track-box", {
              playing: track.id === currentTrackId,
              transparent: isTrackEnded && isLastTrack(track),
            })}
            key={track.id}
          >
            <div className={cx("player")}>
              <img className={cx("avatar")} src={avatar} alt={track.title} />
              <Player
                trackId={track.id}
                trackLink={track.link}
                trackAvatar={track.avatar}
                trackTitle={track.title}
                trackPerformer={track.stageName}
                trackType={track.type}
                //
                isStatus={track.id === currentTrackId}
                onPlay={() => handleTrackPlay(track)}
                onPause={() => handleTrackPause(track)}
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

            <div className={cx("info")}>
              <Link
                className={cx("link")}
                to={routesConfig.track
                  .replace(`:stageName`, track.stageName.replace(/\//g, "-"))
                  .replace(`:trackTitle`, track.title.replace(/\//g, "-"))}
              />

              <h4 className={cx("title")}>{track.title}</h4>
              <h5 className={cx("performer")}>{track.stageName}</h5>
            </div>

            <div className={cx("more")}>
              <div className={cx("streams")}>
                <FontAwesomeIcon
                  className={cx("listeners")}
                  icon={faHeadphones}
                />
                <h5 className={cx("streamed")}>
                  {new Intl.NumberFormat().format(track.streamed || 0)}
                </h5>
              </div>
              <div className={cx("share")}>
                <AudioShareLink
                  LinkFixSize
                  stageName={track.stageName}
                  trackTitle={track.title}
                  typeURL="track"
                />
              </div>
              <div className={cx("add")}>
                <YourPlaylistCheck
                  trackId={track.id}
                  trackLink={track.link}
                  trackAvatar={track.avatar}
                  trackTitle={track.title}
                  trackPerformer={track.stageName}
                  trackGenre={track.genre}
                  trackType={track.type}
                  streamed={track.streamed}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumList;
