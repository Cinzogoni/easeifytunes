import classNames from "classnames/bind";
import styles from "./TrackInfo.module.scss";
const cx = classNames.bind(styles);

import { useAudioPlayer } from "../AudioPlayerProvider";

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Player from "../Player";
import YourPlaylistCheck from "../YourPlaylistCheck";
import AudioShareLink from "../AudioShareLink";

function TrackInfo({
  id,
  link,
  avatar,
  title,
  stageName,
  trackType,
  genre,
  releaseDay,
  streamed,
  linkTo,
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
      <div className={cx("back")} onClick={linkTo}>
        <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
      </div>

      <div className={cx("container")}>
        <img className={cx("avatar")} src={avatar} alt={title} />

        <div className={cx("info")}>
          <h3 className={cx("title")}>{title}</h3>
          <h4 className={cx("performer")}>{stageName}</h4>
          <h5 className={cx("type")}>{trackType}</h5>
          <h5 className={cx("genre")}>{genre}</h5>
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
              <AudioShareLink
                stageName={stageName}
                trackTitle={title}
                typeURL="track"
              />
            </div>

            <div className={cx("add")}>
              <YourPlaylistCheck
                positionFix
                checkFix
                trackId={id}
                trackLink={link}
                trackAvatar={avatar}
                trackTitle={title}
                trackPerformer={stageName}
                trackGenre={genre}
                streamed={streamed}
              />
            </div>
          </div>
          <div className={cx("player")}>
            <Player
              trackId={id}
              trackLink={link}
              trackTitle={title}
              trackPerformer={stageName}
              trackType={trackType}
              //
              isStatus={id === currentTrackId}
              onPlay={() =>
                handlePlay(
                  id,
                  {
                    trackTitle: title,
                    trackPerformer: stageName,
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

export default TrackInfo;
