import classNames from "classnames/bind";
import styles from "./MusicMaker.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Navigation from "../Navigation";
import MusicMakerBox from "../MusicMakerBox";
import RowColHomePage from "../GridSystem/RowColHomePage";

import { useYourPlaylist } from "../YourPlaylistProvider";
import { useTrackInfo } from "../TrackInfoProvider";
import { useTranslation } from "react-i18next";
import { useScroll } from "~/hooks";

const cx = classNames.bind(styles);
function MusicMaker() {
  const { t } = useTranslation();
  const { musicMaker } = useTrackInfo();
  const {
    setShowNewReleasesPlaylist,
    setActiveNewReleasesPlaylist,
    setShowNewReleasesNotify,
  } = useYourPlaylist();

  const maker = musicMaker.map((maker) => ({ ...maker }));

  const sortedMusicMakers = maker.slice().sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority ? -1 : 1;
    }

    const makerNameA = a.makerName || "";
    const makerNameB = b.makerName || "";

    return makerNameA.localeCompare(makerNameB);
  });

  const { handleScroll, transformValue, activeMove } = useScroll(
    sortedMusicMakers,
    window.innerWidth
  );

  return (
    <div className={cx("container")}>
      <div className={cx("actions")}>
        <h2 className={cx("title")}>{t("musicMaker")}</h2>

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
          <Navigation id={cx("music-maker-viewAll")}>
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
        element2={<MusicMakerBox />}
        items={sortedMusicMakers}
      />
    </div>
  );
}

export default MusicMaker;
