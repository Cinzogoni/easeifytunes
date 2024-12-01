import classNames from "classnames/bind";
import styles from "./SidebarPlaylists.module.scss";
const cx = classNames.bind(styles);

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";

import { useUser } from "~/components/UserProvider";
import { usePopUp } from "~/components/PopUpProvider";
import { useYourPlaylist } from "~/components/YourPlaylistProvider";

function SidebarPlaylists({ children }) {
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const { openLoginPopUp, openSignUpPopUp } = usePopUp();
  const { playlistItem, clickSidebarAdd, handleAddPlaylistPopUp } =
    useYourPlaylist();

  const handleLoginForm = () => {
    openLoginPopUp();
  };

  const handleSignUpForm = () => {
    openSignUpPopUp();
  };

  return (
    <div className={cx("playlists")}>
      <div className={cx("heading")}>
        <h3 className={cx("title")}>{t("yourPlaylists")}</h3>
        <div
          onClick={handleAddPlaylistPopUp}
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
              handleAddPlaylistPopUp,
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
