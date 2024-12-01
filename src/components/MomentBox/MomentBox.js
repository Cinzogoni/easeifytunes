import classNames from "classnames/bind";
import styles from "./MomentBox.module.scss";

import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function MomentBox({ id, link, date, name, onPlay, isVideoPlaying }) {
  const [showTitle, setShowTitle] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!isVideoPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  const handlePlay = () => {
    onPlay(id);
    setShowTitle(true);
  };

  const handlePause = () => {
    setShowTitle(false);
  };

  return (
    <div className={cx("wrapper")}>
      <video
        ref={videoRef}
        className={cx("video-player")}
        controls
        controlsList="nodownload"
        onPlay={handlePlay}
        onPause={handlePause}
      >
        <source src={link} type="video/mp4" />
      </video>
      {!showTitle && (
        <div className={cx("info")}>
          <h6 className={cx("date")}>{date}</h6>
          <h6 className={cx("title")}>{name}</h6>
        </div>
      )}
    </div>
  );
}

export default MomentBox;
