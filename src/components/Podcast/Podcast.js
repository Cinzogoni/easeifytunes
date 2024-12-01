import classNames from "classnames/bind";
import styles from "./Podcast.module.scss";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Navigation from "../Navigation";
import GridSystem from "../GridSystem";
import PodcastBox from "../PodcastBox";

import { useTrackInfo } from "../TrackInfoProvider";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
function Podcast() {
  const { t } = useTranslation();
  const { podcast } = useTrackInfo();

  // console.log(podcast);

  const [width, setWidth] = useState(window.innerWidth);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [activeMove, setActiveMove] = useState(null);

  const calculateBoxesPerSlide = () => {
    if (width >= 1600) {
      return 4;
    }
    if (width >= 1220 && width < 1599) {
      return 3;
    }
    if (width >= 900 && width < 1220) {
      return 2;
    }
    return 1;
  };

  const handleScroll = (move) => {
    const totalBoxes = podcast.length;

    const scrollIndex = () => {
      if (width >= 1600) {
        return totalBoxes - 4;
      }
      if (width >= 1220 && width < 1599) {
        return totalBoxes - 3;
      }
      if (width >= 900 && width < 1220) {
        return totalBoxes - 2;
      }
      if (width >= 307 && width < 900) {
        return totalBoxes - 1;
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

  return (
    <div className={cx("wrapper")}>
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

        <GridSystem rowClass={cx("row")}>
          <div
            className={cx("frame")}
            style={{
              transition: "transform 0.3s ease-in-out",
              transform: transformValue(),
            }}
          >
            {podcast.map((podcast, index) => (
              <GridSystem
                key={index}
                colClass={cx("col")}
                colL={cx("l-3")}
                colML={cx("ml-4")}
                colM={cx("m-6")}
                colSM={cx("sm-12")}
                colS={cx("s-12")}
                colMo={cx("mo-12")}
              >
                <div className={cx("boxes")}>
                  <div className={cx("podcast-box")}>
                    <PodcastBox
                      podcastId={`podcast_${podcast.id}`}
                      podcastAvatar={podcast.avatar}
                      podcastTopic={podcast.topic}
                      podcastDescription={podcast.description}
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

export default Podcast;
