import classNames from "classnames/bind";
import styles from "./AlbumItem.module.scss";

import { memo } from "react";
import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);
function AlbumItem({ albumAvatar, albumName, albumPerformer }) {
  return (
    <div className={cx("wrapper")}>
      <Link
        to={routesConfig.albumPage
          .replace(`:albumPerformer`, albumPerformer.replace(/\//g, "-"))
          .replace(`:albumName`, albumName.replace(/\//g, "-"))}
      >
        <div className={cx("info-box")}>
          <img className={cx("avatar")} src={albumAvatar} alt={albumName} />

          <div className={cx("info")}>
            <h6 className={cx("name")}>{albumName}</h6>
            <p className={cx("performer")}>{albumPerformer}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(AlbumItem);
