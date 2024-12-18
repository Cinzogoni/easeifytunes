import classNames from "classnames/bind";
import styles from "./AlbumBox.module.scss";

import routesConfig from "~/config/routes";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function AlbumBox({ albumAvatar, albumName, albumPerformer }) {
  return (
    <div className={cx("container")}>
      <Link
        className={cx("link")}
        to={routesConfig.albumPage
          .replace(`:albumPerformer`, albumPerformer.replace(/\//g, "-"))
          .replace(`:albumName`, albumName.replace(/\//g, "-"))}
      />

      <div className={cx("frame")}>
        <img className={cx("avatar")} src={albumAvatar} alt={albumName} />

        <div className={cx("desc")}>
          <h5 className={cx("album-name")}>{albumName}</h5>
          <h6 className={cx("album-performer")}>{albumPerformer}</h6>
        </div>
      </div>
    </div>
  );
}

export default AlbumBox;
