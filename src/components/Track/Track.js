import classNames from "classnames/bind";
import styles from "./Track.module.scss";

const cx = classNames.bind(styles);

function Track({
  info,
  social,
  list,

  PlaylistMode,
  wrapperPlaylistMode,
  framePlaylistMode,
  boxPlaylistMode,
}) {
  return (
    <div className={cx("wrapper", { wrapperPlaylistMode })}>
      <div className={cx("container", { PlaylistMode })}>
        <div className={cx("frame", { framePlaylistMode })}>{info}</div>
        <div className={cx("social")}>{social}</div>
        <div className={cx("box", { boxPlaylistMode })}>{list}</div>
      </div>
    </div>
  );
}

export default Track;
