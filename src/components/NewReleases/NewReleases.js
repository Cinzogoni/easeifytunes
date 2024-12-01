import classNames from "classnames/bind";
import styles from "./NewReleases.module.scss";

import { useState, useEffect, memo, useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Navigation from "../Navigation";
import GridSystem from "../GridSystem";
import NewReleasesBox from "../NewReleasesBox";

import { useTrackInfo } from "../TrackInfoProvider";

import { useYourPlaylist } from "../YourPlaylistProvider";

import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
function NewReleases() {
  const { t } = useTranslation();
  const { musicMaker } = useTrackInfo();
  const { setShowNewReleasesPlaylist, setActiveNewReleasesPlaylist } =
    useYourPlaylist();

  const allTrack = musicMaker.flatMap((maker) => [
    ...maker.singles,
    ...maker.albums,
  ]);

  // console.log(allTrack);

  const minimumReleaseDate = new Date("2024-10-01");

  const filteredTracks = useMemo(() => {
    return (
      allTrack
        .filter((track) => {
          const releaseDate = new Date(track.releaseDay);
          return releaseDate >= minimumReleaseDate;
        })
        .sort((a, b) => {
          const dateA = new Date(a.releaseDay);
          const dateB = new Date(b.releaseDay);
          return dateB - dateA;
        }) || []
    );
  }, [allTrack]);

  const [width, setWidth] = useState(window.innerWidth);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [activeMove, setActiveMove] = useState(null);

  const calculateBoxesPerSlide = () => {
    if (width >= 1600) {
      return 4;
    }
    if (width >= 1221 && width < 1599) {
      return 3;
    }
    if (width >= 900 && width < 1220) {
      return 2;
    }
    return 1;
  };

  const handleScroll = (move) => {
    const totalBoxes = filteredTracks.length;

    const maxScrollIndex = () => {
      if (width >= 1600) {
        return totalBoxes - 4;
      }
      if (width >= 1221 && width < 1599) {
        return totalBoxes - 3;
      }
      if (width >= 900 && width < 1220) {
        return totalBoxes - 2;
      }
      return totalBoxes - 1;
    };

    setScrollIndex((prevIndex) => {
      if (move === "prev") {
        return Math.max(prevIndex - 1, 0);
      } else if (move === "next") {
        return Math.min(prevIndex + 1, maxScrollIndex());
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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("actions")}>
          <h2 className={cx("title")}>{t("newReleases")}</h2>

          <div className={cx("actions-btn")}>
            <FontAwesomeIcon
              className={cx("move")}
              icon={faCircleChevronLeft}
              onClick={() => {
                handleScroll("prev"),
                  setShowNewReleasesPlaylist(false),
                  setActiveNewReleasesPlaylist(false);
              }}
              style={{
                transition: "transition: transform 0.1s ease-in-out",
                transform: activeMove === "prev" ? "scale(1.1)" : "scale(1)",
              }}
            />
            <FontAwesomeIcon
              className={cx("move")}
              icon={faCircleChevronRight}
              onClick={() => {
                handleScroll("next"),
                  setShowNewReleasesPlaylist(false),
                  setActiveNewReleasesPlaylist(false);
              }}
              style={{
                transition: "transition: transform 0.1s ease-in-out",
                transform: activeMove === "next" ? "scale(1.1)" : "scale(1)",
              }}
            />
            <Navigation id={cx("new-releases-viewAll")}>
              <h3 className={cx("link-route")}>{t("viewAll")}</h3>
            </Navigation>
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
            {filteredTracks.map((track) => (
              <GridSystem
                key={track.id}
                colClass={cx("col")}
                colL={cx("l-3")}
                colML={cx("ml-4")}
                colM={cx("m-6")}
                colSM={cx("sm-12")}
                colS={cx("s-12")}
                colMo={cx("mo-12")}
              >
                <div className={cx("boxes")}>
                  <div className={cx("song-box")}>
                    <NewReleasesBox
                      trackId={track.id}
                      trackLink={track.link}
                      trackAvatar={track.avatar || track.albumAvatar}
                      trackTitle={track.title}
                      trackPerformer={track.stageName}
                      trackType={track.type}
                      trackGenre={track.genre}
                      releaseDay={track.releaseDay}
                      streamed={track.streamed}
                    />
                  </div>
                </div>
              </GridSystem>
            ))}
          </div>
        </GridSystem>
      </div>
    </div>
  );
}

export default memo(NewReleases);
