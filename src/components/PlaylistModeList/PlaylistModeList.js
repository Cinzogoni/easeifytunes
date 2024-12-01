import classNames from "classnames/bind";
import styles from "./PlaylistModeList.module.scss";
const cx = classNames.bind(styles);

import { useEffect, useRef, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import { useAudioPlayer } from "../AudioPlayerProvider";

import Player from "../Player";

function PlaylistModeList({ trackList, findPlaylistItem, yourPlaylistName }) {
  const { t } = useTranslation();
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
    storedTrackListMap,
    activeMemo,
    setActiveMemo,
  } = useAudioPlayer();

  // console.log("playlistItem filter:", trackList);

  const trackRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const storedTrackArray = useMemo(() => {
    return Array.from(storedTrackListMap.values()).flatMap(
      (item) => item.trackList
    );
  }, [storedTrackListMap]);

  const value = trackList[0];
  const albumAvatar = value?.avatar;

  const podcastStoredAvatar = storedTrackArray.map((a) => a.avatarAudio);
  const podcastListAvatar = trackList.map((a) => a.avatarAudio);

  const yourPlaylistStoredAvatar = storedTrackArray.map((a) => a.trackAvatar);
  const yourPlaylistAvatar = trackList.map((a) => a.trackAvatar);

  const activeAvatar =
    storedTrackArray.length > 0
      ? storedTrackArray[0].avatar || podcastStoredAvatar
      : null;

  const avatarSrc = useMemo(() => {
    if (activeMemo) {
      return activeAvatar || podcastStoredAvatar;
    }
    return albumAvatar || podcastListAvatar;
  }, [
    activeMemo,
    activeAvatar,
    podcastStoredAvatar,
    podcastListAvatar,
    albumAvatar,
  ]);

  const finalAvatarSrc = useMemo(() => {
    return trackList.map((_, index) => {
      return (
        (yourPlaylistAvatar && yourPlaylistAvatar[index]) ||
        (yourPlaylistStoredAvatar && yourPlaylistStoredAvatar[index]) ||
        avatarSrc
      );
    });
  }, [trackList, yourPlaylistAvatar, yourPlaylistStoredAvatar, avatarSrc]);

  const displayTrackList = useMemo(() => {
    if (isRandom && shuffledTrackList.length > 0) {
      return shuffledTrackList;
    }
    return activeMemo ? storedTrackArray : trackList;
  }, [isRandom, shuffledTrackList, activeMemo, storedTrackArray, trackList]);

  useEffect(() => {
    const playlist = trackList.length > 0 ? trackList : storedTrackArray;

    if (playlist.length > 0) {
      setTrackList(playlist);
      if (isRandom) {
        setShuffledTrackList(shuffledTrackList);
      }
    }
    // console.log("Shuffled Track List:", shuffledTrackList);
  }, [storedTrackArray, activeMemo, setTrackList, shuffledTrackList]);

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
      ? displayTrackList.findIndex(
          (track) =>
            track.id === currentTrackId || track.trackId === currentTrackId
        )
      : -1;

    setTrackIndex(index);

    if (!isScrolling && index !== -1 && trackRefs.current[index]) {
      trackRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // console.log("current track id:", currentTrackId);
  }, [currentTrackId, setTrackIndex]);

  useEffect(() => {
    if (!activeMemo) {
      setActiveMemo(false);
    }
  }, [activeMemo]);

  const handleTrackPlay = (track) => {
    if (!activeMemo) {
      setStoredTrackListMap(new Map());
      setTrackList(displayTrackList);
    }

    setTrackIndex(
      displayTrackList.findIndex(
        (t) => t.id || t.trackId === track.id || track.trackId
      )
    );
    handlePlay(
      track.id || track.trackId,
      {
        trackTitle: track.title || track.trackTitle,
        trackPerformer:
          track.stageName || track.publisher || track.trackPerformer,
        trackType: track.type || track.trackType,
      },
      track.link || track.trackLink
    );
    setTrackList(trackList);
  };

  const handleTrackPause = (track) => {
    setTrackIndex(
      displayTrackList.findIndex(
        (t) => t.id === track.id || t.trackId === track.trackId
      )
    );
    handlePause(track.id || track.trackId);
  };

  const isLastTrack = (track) => {
    return (
      displayTrackList[displayTrackList.length - 1]?.id === track.id ||
      displayTrackList[displayTrackList.length - 1]?.trackId === track.trackId
    );
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {!findPlaylistItem && !trackList.length ? (
          <div className={cx("yourPlaylist-null")}>
            <h4 className={cx("yourPlaylist-notify")}>
              {t("playlistNull")} {""} "{yourPlaylistName}"
            </h4>
          </div>
        ) : (
          <div className={cx("tracks")}>
            {displayTrackList.map((track, index) => (
              <div
                ref={(el) => (trackRefs.current[index] = el)}
                className={cx("track-box", {
                  playing:
                    track.id === currentTrackId ||
                    track.trackId === currentTrackId,
                  transparent: isTrackEnded && isLastTrack(track),
                })}
                key={track.id || track.trackId}
              >
                <div className={cx("player")}>
                  <img
                    className={cx("track-avatar")}
                    src={finalAvatarSrc[index]}
                    alt={track.title || track.trackTitle}
                  />

                  <Player
                    trackId={track.id || track.trackId}
                    trackLink={track.link || track.trackLink}
                    trackTitle={track.title || track.trackTitle}
                    trackPerformer={
                      track.stageName || track.publisher || track.trackPerformer
                    }
                    trackType={track.type || track.trackType}
                    //
                    isStatus={
                      track.id === currentTrackId ||
                      track.trackId === currentTrackId
                    }
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
                    playerAlbumList
                    waveformBoxSingleTracks
                    stopperAlbumList
                    actionsAlbumList
                    hideAlbumList
                  />
                </div>

                <div className={cx("track-info")}>
                  <Link
                    className={cx("track-link")}
                    to={routesConfig.track
                      .replace(
                        `:stageName`,
                        track.stageName ||
                          track.publisher ||
                          track.trackPerformer.replace(/\//g, "-")
                      )
                      .replace(
                        `:trackTitle`,
                        track.title || track.trackTitle.replace(/\//g, "-")
                      )}
                  />
                  <h4 className={cx("track-title")}>
                    {track.title || track.trackTitle}
                  </h4>
                  <h5 className={cx("track-performer")}>
                    {track.stageName || track.publisher || track.trackPerformer}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaylistModeList;
