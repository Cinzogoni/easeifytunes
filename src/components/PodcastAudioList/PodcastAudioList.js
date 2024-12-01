import classNames from "classnames/bind";
import styles from "./PodcastAudioList.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faLink } from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "../AudioPlayerProvider";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import routesConfig from "~/config/routes";

import Player from "../Player";
import YourPlaylistCheck from "../YourPlaylistCheck";

const cx = classNames.bind(styles);
function PodcastAudioList({ audioList }) {
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    isTrackEnded,
    setTrackIndex,
    setTrackList,
    setShuffledTrackList,
    shuffledTrackList,
    isRandom,
    setStoredTrackListMap,
    activeMemo,
    setActiveMemo,
  } = useAudioPlayer();
  const { t } = useTranslation();

  // console.log(audioList);

  const audioRefs = useRef([]);
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
    if (audioList.length > 0) {
      setTrackList(audioList);
      if (isRandom) {
        const shuffledList = shuffleArray(audioList);
        setShuffledTrackList(shuffledList);
      }
    }
  }, [isRandom, setTrackList, setShuffledTrackList]);

  const displayTrackList = isRandom ? shuffledTrackList : audioList;

  const sortedPodcast = displayTrackList.sort(
    (a, b) => new Date(b.releaseDay) - new Date(a.releaseDay)
  );

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

    if (!isScrolling && index !== -1 && audioRefs.current[index]) {
      audioRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTrackId, displayTrackList, setTrackIndex]);

  useEffect(() => {
    if (!activeMemo) {
      setActiveMemo(false);
    }

    // console.log("PodcastAudioList activeMemo:", activeMemo);
  }, [activeMemo]);

  const handleTrackPlay = (audio) => {
    if (!activeMemo) {
      setStoredTrackListMap(new Map());
      setTrackList(displayTrackList);
    }

    setTrackIndex(displayTrackList.findIndex((t) => t.id === audio.id));
    handlePlay(
      audio.id,
      {
        trackTitle: audio.title,
        trackPerformer: audio.publisher,
        trackType: audio.type,
      },
      audio.link
    );
  };

  const handleTrackPause = (audio) => {
    setTrackIndex(displayTrackList.findIndex((t) => t.id === audio.id));
    handlePause(audio.id);
  };

  const isLastTrack = (audio) => {
    return displayTrackList[displayTrackList.length - 1]?.id === audio.id;
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("audios")}>
          {sortedPodcast.map((audio, index) => (
            <div
              ref={(el) => (audioRefs.current[index] = el)}
              className={cx("audio-box", {
                playing: audio.id === currentTrackId,
                transparent: isTrackEnded && isLastTrack(audio),
              })}
              key={audio.id}
            >
              <div className={cx("player")}>
                <img
                  className={cx("audio-avatar")}
                  src={audio.audioAvatar}
                  alt={audio.title}
                />
                <Player
                  podcastAudioList={audioList}
                  trackId={audio.id}
                  trackLink={audio.link}
                  trackAvatar={audio.avatarAudio}
                  trackTitle={audio.title}
                  trackPerformer={audio.publisher}
                  trackType={audio.type}
                  //
                  isStatus={audio.id === currentTrackId}
                  onPlay={() => handleTrackPlay(audio)}
                  onPause={() => handleTrackPause(audio)}
                  //
                  framePodcastResize
                  playerPodcastList
                  playerAlbumList
                  waveformBoxSingleTracks
                  stopperPodcastList
                />
              </div>

              <div className={cx("audio-info")}>
                <Link
                  className={cx("audio-link")}
                  to={routesConfig.podcastAudioPage
                    .replace(`:publisher`, audio.publisher.replace(/\//g, "-"))
                    .replace(`:title`, audio.title.replace(/\//g, "-"))}
                />
                <h4 className={cx("audio-title")}>{audio.title}</h4>
                <h5 className={cx("audio-publisher")}>
                  {t("publisher")}: {audio.publisher}
                </h5>
                <h5 className={cx("audio-author")}>
                  {t("author")}: {audio.author}
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
                  <FontAwesomeIcon className={cx("share-link")} icon={faLink} />
                </div>
                <div className={cx("add")}>
                  <YourPlaylistCheck
                    trackId={audio.id}
                    trackLink={audio.link}
                    trackAvatar={audio.audioAvatar}
                    trackTitle={audio.title}
                    trackPerformer={audio.publisher}
                    trackType={audio.type}
                    streamed={audio.streamed}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PodcastAudioList;
