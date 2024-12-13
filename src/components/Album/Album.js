import classNames from "classnames/bind";
import styles from "./Album.module.scss";
const cx = classNames.bind(styles);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Navigation from "../Navigation";
import AlbumBox from "../AlbumBox";
import RowColHomePage from "../GridSystem/RowColHomePage";

import { useTrackInfo } from "../TrackInfoProvider";
import { useYourPlaylist } from "../YourPlaylistProvider";
import { useTranslation } from "react-i18next";
import { useScroll } from "~/hooks";

function Album() {
  const { musicMaker } = useTrackInfo();
  const { t } = useTranslation();
  const {
    setShowNewReleasesPlaylist,
    setActiveNewReleasesPlaylist,
    setShowNewReleasesNotify,
  } = useYourPlaylist();

  const allAlbums = musicMaker.flatMap((album) => album.albums || []);

  const sortedAlbums = allAlbums.sort(
    (a, b) => new Date(b.releaseDay) - new Date(a.releaseDay)
  );

  const { handleScroll, transformValue, activeMove } = useScroll(
    sortedAlbums,
    window.innerWidth
  );

  return (
    <div className={cx("container")}>
      <div className={cx("actions")}>
        <h2 className={cx("title")}>{t("albums")}</h2>

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
          <Navigation id={cx("album-viewAll")}>
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
        element2={<AlbumBox />}
        items={sortedAlbums}
      />
    </div>
  );
}

export default Album;
