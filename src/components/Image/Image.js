import classNames from "classnames/bind";
import styles from "./Image.module.scss";
const cx = classNames.bind(styles);

import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import avatar from "~/assets/images/avatar/DefaultAvatar.png";
import Tippy from "@tippyjs/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../UserProvider";
import { useYourPlaylist } from "../YourPlaylistProvider";

function Image() {
  const { t } = useTranslation();
  const { setActivePlaylist, setIsVisible, setShowPlaylist } =
    useYourPlaylist();
  const { currentUser, setCurrentUser, selectedAvatar, defaultAvatar } =
    useUser();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const avatarSrc = useMemo(() => selectedAvatar || avatar, [selectedAvatar]);

  const handleShowHide = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const handleLogOut = () => {
    setCurrentUser(false);
    setActivePlaylist(false);
    setIsVisible(false);
    setShowPlaylist(false);
  };

  const handleInfo = useCallback(() => {
    setVisible(false);
    if (currentUser) {
      navigate(`/info/${currentUser.userName}`);
    }
  }, [currentUser, navigate]);

  return (
    <Tippy
      placement="bottom"
      interactive
      appendTo={document.body}
      visible={visible}
      onClickOutside={() => setVisible(false)}
      render={(attrs) =>
        visible && (
          <div className={cx("wrapper")} tabIndex={-1} {...attrs}>
            <div className={cx("boxes")}>
              <div className={cx("box")} onClick={handleInfo}>
                <button className={cx("title")}>
                  <h4 className={cx("info")}>{t("accountInfo")}</h4>
                </button>
                <div className={cx("icon")}>
                  <FontAwesomeIcon
                    className={cx("icon-info")}
                    icon={faCircleUser}
                  />
                </div>
              </div>

              <div className={cx("box")} onClick={handleLogOut}>
                <button className={cx("title")}>
                  <h4 className={cx("logout")}>{t("logOut")}</h4>
                </button>
                <div className={cx("icon")}>
                  <FontAwesomeIcon
                    className={cx("icon-logout")}
                    icon={faRightFromBracket}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      }
    >
      <div className={cx("avatar-box")} onClick={handleShowHide}>
        <div className={cx("avatar-wrapper")}>
          <img
            className={cx("avatar")}
            src={avatarSrc}
            alt={currentUser.name}
          />
          <h6 className={cx("desc")}>
            {selectedAvatar !== defaultAvatar ? "" : t("noImage")}
          </h6>
        </div>
      </div>
    </Tippy>
  );
}

export default Image;
