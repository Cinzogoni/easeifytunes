import classNames from "classnames/bind";
import styles from "./Podcast.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Navigation from "../Navigation";
import PodcastBox from "../PodcastBox";
import RowColHomePage from "../GridSystem/RowColHomePage";

import { useTrackInfo } from "../TrackInfoProvider";
import { useTranslation } from "react-i18next";
import { useScroll } from "~/hooks";

const cx = classNames.bind(styles);
function Podcast() {
  const { t } = useTranslation();
  const { podcast } = useTrackInfo();

  const { handleScroll, transformValue, activeMove } = useScroll(
    podcast,
    window.innerWidth
  );

  return (
    <div className={cx("container")}>
      <div className={cx("actions")}>
        <h2 className={cx("title")}>{t("podcast")}</h2>

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
          <Navigation id={cx("podcast-viewAll")}>
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
        element2={<PodcastBox />}
        items={podcast}
      />
    </div>
  );
}

export default Podcast;
