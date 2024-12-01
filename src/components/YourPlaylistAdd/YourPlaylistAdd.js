import classNames from "classnames/bind";
import styles from "./YourPlaylistAdd.module.scss";
const cx = classNames.bind(styles);

import { useTranslation } from "react-i18next";
import { useYourPlaylist } from "../YourPlaylistProvider";
import { useUser } from "../UserProvider";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { baseName } from "~/bassName";

function YourPlaylistAdd({
  itemName,
  itemDescription,
  setItemName,
  setItemDescription,
  handleAddPlaylistItem,
  handleUpdatePlaylistItem,
  setIsVisible,
  setShowPlaylist,
  setActivePlaylist,
  setIsNewReleasesVisible,
  setActiveNewReleasesPlaylist,
  setShowNewReleasesPlaylist,
  trackId,
}) {
  const { t } = useTranslation();
  const { handleEditPlaylistItem, itemIndex, playlistItem, isEditing } =
    useYourPlaylist();
  const { userName, yourPlaylistName } = useUser();

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNameChange = (e) => {
    const name = e.target.value;

    if (!playlistItem) {
      handleUpdatePlaylistItem(name, itemDescription);
    } else {
      handleEditPlaylistItem(name, itemDescription, itemIndex);
    }
    setItemName(name);
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;

    if (!playlistItem) {
      handleUpdatePlaylistItem(itemName, description);
    } else {
      handleEditPlaylistItem(itemName, description, itemIndex);
    }
    setItemDescription(description);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!trackId) {
      setIsVisible(true);
      setShowPlaylist(true);
      setActivePlaylist(true);

      setIsNewReleasesVisible(false);
      setActiveNewReleasesPlaylist(false);
      setShowNewReleasesPlaylist(false);
    }

    if (trackId) {
      setIsVisible(false);
      setShowPlaylist(false);
      setActivePlaylist(false);

      setIsNewReleasesVisible((prev) => (prev === trackId ? false : trackId));
      setActiveNewReleasesPlaylist((prev) =>
        prev === trackId ? false : trackId
      );
      setShowNewReleasesPlaylist((prev) =>
        prev === trackId ? false : trackId
      );
    }

    handleAddPlaylistItem();

    if (userName && itemName) {
      const newPlaylistName = encodeURIComponent(itemName);
      const playlistPath1 = `${baseName}/yourPlaylistPage/${userName}/${yourPlaylistName}`;
      const playlistPath2 = `${baseName}/yourPlaylistPage/${userName}/${newPlaylistName}`;

      if (currentPath === playlistPath1 || currentPath === playlistPath2) {
        navigate(`${baseName}/yourPlaylistPage/${userName}/${newPlaylistName}`);
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <form className={cx("form")} onSubmit={handleSubmit}>
          <h4 className={cx("title")}>
            {isEditing ? t("newName") : t("yourPlaylistAddItemName")}
          </h4>
          <div className={cx("name")}>
            <div className={cx("box")}>
              <input
                className={cx("frame")}
                type="text"
                autoComplete="off"
                required
                value={itemName || ""}
                onChange={handleNameChange}
              />
            </div>
          </div>

          <h4 className={cx("title")}>
            {isEditing ? t("newDescription") : t("yourPlaylistAddItemDesc")}
          </h4>
          <div className={cx("desc")}>
            <div className={cx("box")}>
              <input
                className={cx("frame")}
                type="text"
                autoComplete="off"
                required
                value={itemDescription || ""}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>

          <div className={cx("submit-bg")}>
            <button type="submit" className={cx("submit-button")}>
              <h5 className={cx("submit-text")}>
                {isEditing ? t("confirm") : t("createYourPlaylist")}
              </h5>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default YourPlaylistAdd;
