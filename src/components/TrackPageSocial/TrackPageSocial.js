import classNames from "classnames/bind";
import styles from "./TrackPageSocial.module.scss";
const cx = classNames.bind(styles);

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

import GridSystem from "../GridSystem";

function TrackPageSocial({ socialTracks }) {
  const { t } = useTranslation();
  const [shuffledTracks, setShuffledTracks] = useState([]);
  const isShuffled = useRef(false);

  const socialGroup = [];
  for (let i = 0; i < socialTracks.length; i += 2) {
    socialGroup.push(socialTracks.slice(i, i + 2));
  }

  useEffect(() => {
    if (!isShuffled.current && socialGroup.length > 0) {
      const shuffled = [...socialGroup]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

      setShuffledTracks(shuffled);
      isShuffled.current = true;
    }
  }, [socialTracks]);

  return (
    <div className={cx("wrapper")}>
      <h6 className={cx("title")}>
        {t("suggestions")}: {socialTracks.length > 0 && socialTracks[0].genre}
      </h6>
      <div className={cx("container")}>
        <GridSystem rowClass={cx("row-2")}>
          <div className={cx("frame")}>
            {shuffledTracks.map((group, groupIndex) => (
              <GridSystem
                key={groupIndex}
                colClass={cx("col")}
                colL={cx("l-2-5")}
                colML={cx("ml-4")}
                colM={cx("m-4")}
                colSM={cx("sm-6")}
              >
                {group.map((track, trackIndex) => (
                  <div key={trackIndex} className={cx("boxes")}>
                    <div className={cx("box")}>
                      <Link
                        to={routesConfig.track
                          .replace(
                            `:stageName`,
                            track.stageName.replace(/\//g, "-")
                          )
                          .replace(
                            `:trackTitle`,
                            track.title.replace(/\//g, "-")
                          )}
                        className={cx("track-link")}
                      />

                      <div className={cx("avatar-box")}>
                        <img
                          src={track.albumAvatar || track.avatar}
                          alt={track.title}
                          className={cx("avatar")}
                        />
                      </div>

                      <div className={cx("info")}>
                        <h5 className={cx("track-title")}>{track.title}</h5>
                        <h6 className={cx("performer")}>{track.stageName}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </GridSystem>
            ))}
          </div>
        </GridSystem>
      </div>
    </div>
  );
}

export default TrackPageSocial;
