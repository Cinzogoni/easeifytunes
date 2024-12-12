import classNames from "classnames/bind";
import styles from "./NewReleases.module.scss";
const cx = classNames.bind(styles);

import { useState, useEffect, memo, useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Navigation from "../Navigation";
import NewReleasesBox from "../NewReleasesBox";
import RowColHomePage from "../GridSystem/RowColHomePage";

import { useTrackInfo } from "../TrackInfoProvider";
import { useYourPlaylist } from "../YourPlaylistProvider";
import { useTranslation } from "react-i18next";
import { useScroll } from "~/hooks";

function NewReleases() {
  const { t } = useTranslation();
  const { musicMaker } = useTrackInfo();
  const {
    setShowNewReleasesPlaylist,
    setActiveNewReleasesPlaylist,
    setShowNewReleasesNotify,
  } = useYourPlaylist();

  const allTrack = musicMaker.flatMap((maker) => [
    ...maker.singles,
    ...maker.albums,
  ]);

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

  const { handleScroll, transformValue, activeMove } = useScroll(
    filteredTracks,
    window.innerWidth
  );

  return (
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
                setActiveNewReleasesPlaylist(false),
                setShowNewReleasesNotify(false);
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
                setActiveNewReleasesPlaylist(false),
                setShowNewReleasesNotify(false);
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

      <RowColHomePage
        element1={
          <div
            className={cx("frame")}
            style={{
              transition: "transform 0.3s ease-in-out",
              transform: transformValue(),
            }}
          />
        }
        element2={<NewReleasesBox />}
        items={filteredTracks}
      />
    </div>
  );
}

export default memo(NewReleases);
