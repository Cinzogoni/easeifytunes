import classNames from "classnames/bind";
import styles from "./MusicMakerList.module.scss";
const cx = classNames.bind(styles);

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useAudioPlayer } from "../AudioPlayerProvider";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faHeadphones,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

import GridSystem from "../GridSystem";
import Player from "../Player";

import routesConfig from "~/config/routes";
import YourPlaylistCheck from "../YourPlaylistCheck";
import AudioShareLink from "../AudioShareLink";

function MusicMakerList({ musicAlbums, musicSingles }) {
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    isTrackEnded,
    setTrackIndex,
  } = useAudioPlayer();
  const { t } = useTranslation();

  const [width, setWidth] = useState(window.innerWidth);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [activeMove, setActiveMove] = useState(null);

  const trackRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const sortedMusicAlbums = musicAlbums
    .sort((a, b) => new Date(b.releaseDay) - new Date(a.releaseDay))
    .slice(0, musicAlbums.length);

  const sortedMusicSingles = musicSingles.sort(
    (a, b) => new Date(b.releaseDay) - new Date(a.releaseDay)
  );

  const calculateBoxesPerSlide = () => {
    if (width >= 1600) {
      return 5;
    }
    if (width >= 1220 && width < 1599) {
      return 3;
    }
    if (width >= 900 && width < 1220) {
      return 3;
    }
    if (width >= 768 && width < 900) {
      return 2;
    }
  };

  const handleScroll = (move) => {
    const totalBoxes = sortedMusicAlbums.length;

    const scrollIndex = () => {
      if (width >= 1600) {
        return totalBoxes - 5;
      }
      if (width >= 1220 && width < 1599) {
        return totalBoxes - 3;
      }
      if (width >= 900 && width < 1220) {
        return totalBoxes - 3;
      }
      if (width >= 768 && width < 900) {
        return totalBoxes - 2;
      }
    };

    setScrollIndex((prevIndex) => {
      if (move === "prev") {
        return Math.max(prevIndex - 1, 0);
      } else if (move === "next") {
        return Math.min(prevIndex + 1, scrollIndex());
      }
      return prevIndex;
    });

    setActiveMove(move);
    setTimeout(() => {
      setActiveMove(null);
    }, 100);
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transformValue = () => {
    const boxesPerSlide = calculateBoxesPerSlide();
    const slideWidth = 100 / boxesPerSlide;
    return `translateX(-${scrollIndex * slideWidth}%)`;
  };

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
      ? musicSingles.findIndex((track) => track.id === currentTrackId)
      : -1;

    setTrackIndex(index);

    if (!isScrolling && index !== -1 && trackRefs.current[index]) {
      trackRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentTrackId, setTrackIndex]);

  // console.log(musicAlbums);
  // console.log(sortedMusicAlbums);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("album-list")}>
          <div className={cx("actions")}>
            <h2 className={cx("title")}>{t("albums")}</h2>

            <div className={cx("actions-btn")}>
              <FontAwesomeIcon
                className={cx("move")}
                icon={faCircleChevronLeft}
                onClick={() => handleScroll("prev")}
                style={{
                  transition: "transition: transform 0.1s ease-in-out",
                  transform: activeMove === "prev" ? "scale(1.1)" : "scale(1)",
                }}
              />
              <FontAwesomeIcon
                className={cx("move")}
                icon={faCircleChevronRight}
                onClick={() => handleScroll("next")}
                style={{
                  transition: "transition: transform 0.1s ease-in-out",
                  transform: activeMove === "next" ? "scale(1.1)" : "scale(1)",
                }}
              />
            </div>
          </div>

          <GridSystem rowClass={cx("row")}>
            <div
              className={cx("frame")}
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: transformValue(),
              }}
            >
              {sortedMusicAlbums.map((album, index) => (
                <GridSystem
                  key={index}
                  colClass={cx("col")}
                  colL={cx("l-2-5")}
                  colML={cx("ml-4")}
                  colM={cx("m-4")}
                  colSM={cx("sm-6")}
                  colS={cx("s-6")}
                  colMo={cx("mo-12")}
                >
                  <div className={cx("boxes")}>
                    <div className={cx("album-box")}>
                      <div className={cx("album-frame")}>
                        <Link
                          className={cx("album-link")}
                          to={routesConfig.albumPage
                            .replace(
                              `:albumPerformer`,
                              album.albumPerformer.replace(/\//g, "-")
                            )
                            .replace(
                              `:albumName`,
                              album.albumName.replace(/\//g, "-")
                            )}
                        />

                        <div className={cx("avatar-frame")}>
                          <img
                            className={cx("avatar")}
                            src={album.albumAvatar}
                            alt={album.albumName}
                          />
                        </div>

                        <div className={cx("desc")}>
                          <h5 className={cx("album-name")}>
                            {album.albumName}
                          </h5>
                          <h6 className={cx("album-performer")}>
                            {album.albumPerformer}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </GridSystem>
              ))}
            </div>
          </GridSystem>
        </div>

        <div className={cx("single-tracks")}>
          <h2 className={cx("title")}>{t("singleTracks")}</h2>

          {sortedMusicSingles.map((single, index) => (
            <div
              ref={(el) => (trackRefs.current[index] = el)}
              className={cx("track-box", {
                playing: single.id === currentTrackId,
                transparent: isTrackEnded,
              })}
              key={index}
            >
              <div className={cx("player")}>
                <img
                  className={cx("track-avatar")}
                  src={single.avatar}
                  alt={single.title}
                />
                <Player
                  trackId={single.id}
                  trackLink={single.link}
                  trackAvatar={single.avatar}
                  trackTitle={single.title}
                  trackPerformer={single.stageName}
                  trackType={single.type}
                  //
                  isStatus={single.id === currentTrackId}
                  onPlay={() =>
                    handlePlay(
                      single.id,
                      {
                        trackTitle: single.title,
                        trackPerformer: single.stageName,
                      },
                      single.link
                    )
                  }
                  onPause={() => handlePause(single.id)}
                  //
                  frameSingleTracks
                  playerSingleTracks
                  waveformBoxSingleTracks
                  stopperSingleTracks
                />
              </div>

              <div className={cx("track-info")}>
                <Link
                  className={cx("single-link")}
                  to={routesConfig.track
                    .replace(`:stageName`, single.stageName.replace(/\//g, "-"))
                    .replace(`:trackTitle`, single.title.replace(/\//g, "-"))}
                />

                <h4 className={cx("track-title")}>{single.title}</h4>
                <h5 className={cx("track-performer")}>{single.stageName}</h5>
              </div>

              <div className={cx("more-func")}>
                <div className={cx("streams")}>
                  <FontAwesomeIcon
                    className={cx("listeners")}
                    icon={faHeadphones}
                  />
                  <h5 className={cx("streamed")}>
                    {new Intl.NumberFormat().format(single.streamed || 0)}
                  </h5>
                </div>
                <div className={cx("share")}>
                  <AudioShareLink
                    LinkFixSize
                    stageName={single.stageName}
                    trackTitle={single.title}
                  />
                </div>
                <div className={cx("add")}>
                  <YourPlaylistCheck
                    trackId={single.id}
                    trackLink={single.link}
                    trackAvatar={single.avatar}
                    trackTitle={single.title}
                    trackPerformer={single.stageName}
                    trackGenre={single.genre}
                    trackType={single.type}
                    streamed={single.streamed}
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

export default MusicMakerList;
