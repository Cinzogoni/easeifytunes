import classNames from "classnames/bind";
import styles from "./MusicMakerInfo.module.scss";
const cx = classNames.bind(styles);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { useYourPlaylist } from "../YourPlaylistProvider";

import Navigation from "../Navigation";

function MusicMakerInfo({ musicMakerInfo }) {
  const { t } = useTranslation();
  const { setShowNewReleasesPlaylist, setActiveNewReleasesPlaylist } =
    useYourPlaylist();

  const info = musicMakerInfo.map((matched) => ({
    makerAvatar: matched.makerAvatar,
    makerName: matched.makerName,
    role: matched.role,
  }));

  const rolesSplit = (info[0].role || "")
    .split("/")
    .map((r) => t(`roles.${r.trim()}`));

  return (
    <div className={cx("wrapper")}>
      <div className={cx("frame")}>
        <div
          className={cx("back")}
          onClick={() => {
            setShowNewReleasesPlaylist(false);
            setActiveNewReleasesPlaylist(false);
          }}
        >
          <Navigation id="music-maker-viewAll">
            <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
          </Navigation>
        </div>

        <img
          className={cx("avatar")}
          src={info[0].makerAvatar}
          alt={info[0].makerName}
        />
      </div>
      <div className={cx("info")}>
        <h3 className={cx("stage-name")}>{info[0].makerName}</h3>
        <h4 className={cx("role")}>{rolesSplit.join("/")}</h4>
      </div>
    </div>
  );
}

export default MusicMakerInfo;
