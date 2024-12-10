import classNames from "classnames/bind";
import styles from "./MusicTrackItem.module.scss";

import { memo } from "react";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);

function MusicTrackItem({ trackAvatar, trackTitle, trackPerformer }) {
  return (
    <div className={cx("wrapper")}>
      <Link
        to={routesConfig.track
          .replace(`:stageName`, trackPerformer)
          .replace(`:trackTitle`, trackTitle)}
      >
        <div className={cx("info-box")}>
          <img className={cx("avatar")} src={trackAvatar} alt={trackTitle} />
          <div className={cx("info")}>
            <h6 className={cx("track-name")}>{trackTitle}</h6>
            <p className={cx("track-performer")}>{trackPerformer}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(MusicTrackItem);
