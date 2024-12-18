import classNames from "classnames/bind";
import styles from "./PodcastAudioInfo.module.scss";

import { useAudioPlayer } from "../AudioPlayerProvider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faLink,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import Player from "../Player";
import routesConfig from "~/config/routes";
import YourPlaylistCheck from "../YourPlaylistCheck";

const cx = classNames.bind(styles);
function PodcastAudioInfo({
  id,
  link,
  topic,
  avatar,
  title,
  publisher,
  author,
  type,
  releaseDay,
  streamed,
}) {
  const {
    currentTrackId,
    handlePlay,
    handlePause,
    handleLoop,
    activeLoopClick,
    setActiveLoopClick,
  } = useAudioPlayer();
  const { t } = useTranslation();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("back")}>
        <Link
          to={routesConfig.podcastPage.replace(
            `:topic`,
            topic.replace(/\//g, "-")
          )}
        >
          <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
        </Link>
      </div>

      <div className={cx("container")}>
        <img className={cx("avatar")} src={avatar} alt={title} />

        <div className={cx("info")}>
          <h3 className={cx("title")}>{title}</h3>
          <h4 className={cx("publisher")}>
            {t("publisher")}: {publisher}
          </h4>
          <h4 className={cx("author")}>
            {t("author")}: {author}
          </h4>
          <h5 className={cx("release-day")}>
            {t("releaseDay")}: {releaseDay}
          </h5>

          <div className={cx("more")}>
            <div className={cx("streams")}>
              <FontAwesomeIcon
                className={cx("listeners")}
                icon={faHeadphones}
              />
              <h6 className={cx("streamed")}>
                {new Intl.NumberFormat().format(streamed || 0)}
              </h6>
            </div>
            <div className={cx("share")}>
              <FontAwesomeIcon className={cx("link")} icon={faLink} />
            </div>
            <div className={cx("add")}>
              <YourPlaylistCheck
                checkFix
                trackId={id}
                trackLink={link}
                trackAvatar={avatar}
                trackTitle={title}
                trackPerformer={publisher}
                trackType={type}
              />
            </div>
          </div>

          <div className={cx("player")}>
            <Player
              trackId={id}
              trackLink={link}
              trackTitle={title}
              trackPerformer={publisher}
              trackType={type}
              //
              isStatus={id === currentTrackId}
              onPlay={() =>
                handlePlay(
                  id,
                  {
                    trackTitle: title,
                    trackPerformer: publisher,
                  },
                  link
                )
              }
              onPause={() => handlePause(id)}
              onLoop={() => handleLoop()}
              activeLoopClick={activeLoopClick}
              setActiveLoopClick={setActiveLoopClick}
              //
              waveformBoxFooter
              frameTrackInfoResize
              playerTrackInfoResize
              loopTrackInfo
              loopBGTrackInfo
              pauseTrackInfo
              pauseBGTrackInfo
              playerTrackInfo
              playIconTrackInfo
              playFooterIcon
              stopperTrackInfo
              stopIconTrackInfo
              stopFooterIcon
              playtimeTrackInfo
              actionTrackInfoLeft
              actionTrackInfoRight
              randomTrackInfo
              prevTrackInfo
              nextTrackInfo
              volumeBarTrackInfo
              volumeBGTrackInfo
              volumeIconTrackInfo
              playerBtnFrameTrackInfo
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastAudioInfo;
