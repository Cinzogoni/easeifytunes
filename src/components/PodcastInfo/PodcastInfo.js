import classNames from "classnames/bind";
import styles from "./PodcastInfo.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "../AudioPlayerProvider";
import { useTranslation } from "react-i18next";

import Player from "../Player";
import Navigation from "../Navigation";

const cx = classNames.bind(styles);
function PodcastInfo({ podcastInfo }) {
  const {
    handleLoop,
    handleRandomTrack,
    activeLoopClick,
    setActiveLoopClick,
    activeRandomClick,
    setActiveRandomClick,
  } = useAudioPlayer();
  const { t } = useTranslation();

  const info = podcastInfo.map((inner) => ({
    avatar: inner.avatar,
    topic: inner.topic,
    description: inner.description,
  }));

  // console.log(info);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("back")}>
        <Navigation id="podcast-viewAll">
          <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
        </Navigation>
      </div>

      <div className={cx("container")}>
        <img
          className={cx("avatar")}
          src={info[0].avatar}
          alt={t(`topics.${info[0].topic}`)}
        />
        <div className={cx("info")}>
          <h3 className={cx("topic")}>{t(`topics.${info[0].topic}`)}</h3>
          <h4 className={cx("performer")}>
            {t(`description.${info[0].description}`)}
          </h4>
          <div className={cx("player-func")}>
            <Player
              onLoop={handleLoop}
              onRandom={handleRandomTrack}
              activeLoopClick={activeLoopClick}
              setActiveLoopClick={setActiveLoopClick}
              activeRandomClick={activeRandomClick}
              setActiveRandomClick={setActiveRandomClick}
              frameAlbumInfo
              playerAlbumInfoResize
              playerAlbumInfo
              actionsAlbumInfo
              hideAlbumInfo
              spaceAlbumInfo
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastInfo;
