import classNames from "classnames/bind";
import styles from "./MomentViewAll.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

import GridSystem from "~/components/GridSystem";
import MomentBox from "~/components/MomentBox";
import Navigation from "~/components/Navigation";

import { useTrackInfo } from "~/components/TrackInfoProvider";
import { useAudioPlayer } from "~/components/AudioPlayerProvider";

const cx = classNames.bind(styles);

function MomentViewAll() {
  const { handleVideoPlay, isVideoPlaying } = useAudioPlayer();
  const { moment } = useTrackInfo();
  const [activeVideoId, setActiveVideoId] = useState(null);

  const sortedMoment = [...moment].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleTheVideoPlay = (videoId) => {
    setActiveVideoId(videoId);
    handleVideoPlay(videoId);
  };
  const handleTheAudioPause = () => {
    handleVideoPlay(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("back-home")}>
          <Navigation>
            <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
          </Navigation>
        </div>

        <div className={cx("video-box")}>
          <GridSystem rowClass={cx("row-1")}>
            {sortedMoment.map((video, index) => (
              <GridSystem
                key={index}
                colClass={cx("col")}
                colL={cx("l-4")}
                colML={cx("ml-6")}
                colM={cx("m-12")}
                colSM={cx("sm-12")}
                colS={cx("s-12")}
                colMo={cx("mo-12")}
              >
                <div className={cx("frame")}>
                  <div className={cx("boxes")}>
                    <MomentBox
                      id={video.id}
                      link={video.link}
                      date={video.date}
                      name={video.name}
                      isVideoPlaying={
                        activeVideoId === video.id && isVideoPlaying
                      }
                      onPlay={() => handleTheVideoPlay(video.id)}
                      onPause={handleTheAudioPause}
                    />
                  </div>
                </div>
              </GridSystem>
            ))}
          </GridSystem>
        </div>
      </div>
    </div>
  );
}

export default MomentViewAll;