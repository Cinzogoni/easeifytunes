import classNames from "classnames/bind";
import styles from "./TrendingSongs.module.scss";

import { useState, useEffect, memo, useMemo, useCallback } from "react";

import GridSystem from "../GridSystem";
import TrendingSongsBox from "../TrendingSongsBox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { useTrackInfo } from "../TrackInfoProvider";
import { useYourPlaylist } from "../YourPlaylistProvider";

import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
function TrendingSongs() {
  const { t } = useTranslation();
  const { musicMaker } = useTrackInfo();
  const { setShowNewReleasesPlaylist, setActiveNewReleasesPlaylist } =
    useYourPlaylist();

  const [width, setWidth] = useState(window.innerWidth);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [activeMove, setActiveMove] = useState(null);

  const allTrack = musicMaker.flatMap((maker) => [
    ...maker.singles,
    ...maker.albums,
  ]);

  const minimumReleaseDate = new Date("2022-01-01");

  const filteredTracks = useMemo(() => {
    return allTrack
      .filter((track) => {
        const releaseDate = new Date(track.releaseDay);
        return releaseDate >= minimumReleaseDate && track.trend === true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.releaseDay);
        const dateB = new Date(b.releaseDay);
        return dateB - dateA;
      });
  }, [allTrack, minimumReleaseDate]);

  const songGroups = [];
  for (let i = 0; i < filteredTracks.length; i += 3) {
    songGroups.push(filteredTracks.slice(i, i + 3));
  }

  const calculateBoxesPerSlide = useCallback(() => {
    if (width >= 1920) return 4;
    if (width >= 1440 && width < 1920) return 3;
    if (width >= 1280 && width < 1440) return 3;
    if (width >= 854 && width < 1280) return 2;
    if (width >= 700 && width < 854) return 2;
    return 1;
  }, [width]);

  const handleScroll = (move) => {
    const totalBoxes = songGroups.length;

    const maxScrollIndex = () => {
      const boxesPerSlide = calculateBoxesPerSlide();
      return totalBoxes - boxesPerSlide;
    };

    setScrollIndex((prevIndex) => {
      if (move === "prev") return Math.max(prevIndex - 1, 0);
      if (move === "next") return Math.min(prevIndex + 1, maxScrollIndex());
      return prevIndex;
    });

    setActiveMove(move);
    setTimeout(() => {
      setActiveMove(null);
    }, 100);
  };

  const transformValue = () => {
    const boxesPerSlide = calculateBoxesPerSlide();
    const slideWidth = 100 / boxesPerSlide;
    return `translateX(-${scrollIndex * slideWidth}%)`;
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("actions")}>
        <h6 className={cx("title")}>{t("trendingSongs")}</h6>
        <div className={cx("action-btn")}>
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
          {songGroups.map((group, index) => (
            <GridSystem
              key={index}
              colClass={cx("col")}
              colL={cx("l-3")}
              colML={cx("ml-4")}
              colM={cx("m-6")}
              colSM={cx("sm-6")}
              colS={cx("s-6")}
            >
              <TrendingSongsBox tracks={group} />
            </GridSystem>
          ))}
        </div>
      </GridSystem>
    </div>
  );
}
export default memo(TrendingSongs);
