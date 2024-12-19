import classNames from "classnames/bind";
import styles from "./SidebarPlaylists.module.scss";
const cx = classNames.bind(styles);

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";

import { useUser } from "~/components/UserProvider";
import { useModal } from "~/components/ModalProvider";
import { useYourPlaylist } from "~/components/YourPlaylistProvider";

function SidebarPlaylists({ children }) {
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const { openLoginModal, openSignUpModal } = useModal();
  const { playlistItem, clickSidebarAdd, handleAddPlaylistModal } =
    useYourPlaylist();

  const handleLoginForm = () => {
    openLoginModal();
  };

  const handleSignUpForm = () => {
    openSignUpModal();
  };

  return (
    <div className={cx("playlists")}>
      <div className={cx("heading")}>
        <h3 className={cx("title")}>{t("yourPlaylists")}</h3>
        <div
          onClick={handleAddPlaylistModal}
          className={cx("add-playlistItem")}
        >
          <FontAwesomeIcon
            className={cx("icon", { showLogin: clickSidebarAdd })}
            icon={faPlus}
          />
        </div>
      </div>

      <div className={cx("frame")}>
        {currentUser ? (
          React.Children.map(children, (child) =>
            React.cloneElement(child, {
              handleAddPlaylistModal,
              playlistItem,
            })
          )
        ) : (
          <div className={cx("services")}>
            <div className={cx("exp")}>
              <h5 className={cx("desc")}>
                {t("yourPlaylistLogin")}
                <br />
                <strong className={cx("bold")} onClick={handleLoginForm}>
                  {t("loginNow")}
                </strong>
              </h5>
            </div>

            <div className={cx("exp")}>
              <h5 className={cx("desc")}>
                {t("yourPlaylistSignUp")}
                <br />
                <strong className={cx("bold")} onClick={handleSignUpForm}>
                  {t("signUpNow")}
                </strong>
              </h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SidebarPlaylists;
