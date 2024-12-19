import classNames from "classnames/bind";
import styles from "./YourPlaylistBox.module.scss";
const cx = classNames.bind(styles);

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useYourPlaylist } from "../YourPlaylistProvider";

import YourPlaylistItem from "../YourPlaylistItem";

function YourPlaylistBox(audioProps) {
  const { t } = useTranslation();
  const {
    playlistItem,
    clickFooterAdd,
    handleAddPlaylistModal,
    handleAddPlaylistModal1,
  } = useYourPlaylist();

  const checkClick = () => {
    if (clickFooterAdd) {
      handleAddPlaylistModal();
    }

    if (audioProps) {
      handleAddPlaylistModal1(audioProps);
    }
  };

  return (
    <div className={cx("playlists")}>
      <div className={cx("heading")}>
        <h3 className={cx("title")}>{t("yourPlaylists")}</h3>
        <div onClick={checkClick} className={cx("add-playlistItem")}>
          <FontAwesomeIcon
            className={cx("icon", {
              showModal: clickFooterAdd,
            })}
            icon={faPlus}
          />
        </div>
      </div>

      <div className={cx("frame")}>
        <YourPlaylistItem
          playlistItem={playlistItem}
          {...audioProps}
          //
          footerPlaylistFix
          footerPlaylistItemTitle
          footerPlaylistItemDesc
          footerEdit
          footerRemove
        />
      </div>
    </div>
  );
}

export default YourPlaylistBox;
