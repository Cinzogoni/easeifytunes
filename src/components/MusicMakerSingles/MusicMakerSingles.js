import classNames from "classnames/bind";
import styles from "./MusicMakerSingles.module.scss";
const cx = classNames.bind(styles);

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useAudioPlayer } from "../AudioPlayerProvider";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

import Player from "../Player";

import routesConfig from "~/config/routes";
import YourPlaylistCheck from "../YourPlaylistCheck";
import AudioShareLink from "../AudioShareLink";

function MusicMakerSingles({ musicSingles }) {
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    isTrackEnded,
    setTrackIndex,
  } = useAudioPlayer();
  const { t } = useTranslation();

  const sortedMusicSingles = musicSingles.sort(
    (a, b) => new Date(b.releaseDay) - new Date(a.releaseDay)
  );

  const trackRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);

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

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>{t("singleTracks")}</h2>
      <div className={cx("container")}>
        {sortedMusicSingles.map((single, index) => (
          <div
            className={cx("single-item", {
              playing: single.id === currentTrackId,
              transparent: isTrackEnded,
            })}
            ref={(el) => (trackRefs.current[index] = el)}
            key={single.id}
          >
            <div className={cx("image")}>
              <img
                className={cx("avatar")}
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
                frameResize
                playerResize
                playBtn
                playIcon
                stopBtn
                stopIcon
                waveformBox
              />
            </div>

            <div className={cx("info")}>
              <h4 className={cx("single-title")}>{single.title}</h4>
              <h5 className={cx("performer")}>{single.stageName}</h5>

              <Link
                className={cx("link")}
                to={routesConfig.track
                  .replace(":stageName", single.stageName)
                  .replace(":trackTitle", single.title)}
              />
            </div>

            <div className={cx("menu")}>
              <div className={cx("streams")}>
                <FontAwesomeIcon
                  className={cx("headphone")}
                  icon={faHeadphones}
                />

                <div className={cx("listens")}>
                  <h6 className={cx("listeners")}>
                    {formatStreamed(single.streamed || 0)}
                  </h6>
                </div>
              </div>

              <div className={cx("share")}>
                <AudioShareLink
                  stageName={single.stageName}
                  trackTitle={single.title}
                />
              </div>

              <div className={cx("your-playlist")}>
                <YourPlaylistCheck
                  trackId={single.id}
                  trackAvatar={single.avatar || single.albumAvatar}
                  trackTitle={single.title}
                  trackPerformer={single.stageName}
                  trackLink={single.link}
                  trackGenre={single.genre}
                  trackType={single.type}
                  streamed={single.streamed}
                  releaseDay={single.releaseDay}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicMakerSingles;
