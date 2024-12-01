import classNames from "classnames/bind";
import styles from "./UserPage.module.scss";
const cx = classNames.bind(styles);

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import { useUser } from "~/components/UserProvider";
import { usePopUp } from "~/components/PopUpProvider";

import PopUp from "~/components/PopUp";
import ChangePassword from "~/components/ChangePassword";

function UserPage() {
  const { t } = useTranslation();

  const [phoneVerify, setPhoneVerify] = useState(true);
  const [emailVerify, setEmailVerify] = useState(true);
  const navigate = useNavigate();

  const {
    currentUser,
    setCurrentUser,
    selectedAvatar,
    setSelectedAvatar,
    defaultAvatar,
  } = useUser();

  const {
    isChangePassword,
    openChangePasswordPopUp,
    closeChangePasswordPopUp,
  } = usePopUp();

  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(false);
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedAvatar(imageUrl);

      setCurrentUser((prevUser) => ({
        ...prevUser,
        avatar: imageUrl,
      }));
    }
  };

  const handleChangePassword = () => {
    openChangePasswordPopUp();
  };

  const handlePhoneVerify = () => {};
  const handleEmailVerify = () => {};

  return (
    currentUser && (
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("frame")}>
            <div className={cx("top")}>
              <div className={cx("back-home")}>
                <Link to={routesConfig.home}>
                  <FontAwesomeIcon
                    className={cx("arrow-left")}
                    icon={faArrowLeft}
                  />
                </Link>
              </div>

              <div className={cx("head")}>
                <div className={cx("avatar-box")}>
                  <img
                    className={cx("avatar")}
                    src={selectedAvatar || avatar}
                    alt={currentUser ? currentUser.name : ""}
                  />
                  <h4 className={cx("image-desc")}>
                    {selectedAvatar !== defaultAvatar ? "" : t("noImage")}
                  </h4>
                </div>

                <div className={cx("change-avatar")}>
                  <input
                    className={cx("avatar-input")}
                    id="avatar-input"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <label
                    htmlFor="avatar-input"
                    className={cx("change-avatar-label")}
                  >
                    {t("changeAvatar")}
                  </label>
                </div>
              </div>
            </div>

            <div className={cx("body")}>
              <div className={cx("full-name")}>
                <h4 className={cx("title")}>{t("fullName")}:</h4>
                <strong className={cx("bold")}>
                  {currentUser ? currentUser.name : ""}
                </strong>
              </div>
              <div className={cx("phone-number")}>
                <h4 className={cx("title")}>{t("phoneNumber")}:</h4>
                <strong className={cx("bold")}>
                  {currentUser ? currentUser.phoneNumber : ""}
                </strong>

                {phoneVerify ? (
                  <button className={cx("verified")}>
                    <p className={cx("desc")}>{t("verified")}</p>
                  </button>
                ) : (
                  <button
                    className={cx("verifying")}
                    onClick={handlePhoneVerify}
                  >
                    <p className={cx("desc")}>{t("verify")}</p>
                  </button>
                )}
              </div>
              <div className={cx("email")}>
                <h4 className={cx("title")}>{t("email")}:</h4>
                <strong className={cx("bold")}>
                  {currentUser ? currentUser.email : ""}
                </strong>
                {emailVerify ? (
                  <button className={cx("verified")}>
                    <p className={cx("desc")}>{t("verified")}</p>
                  </button>
                ) : (
                  <button
                    className={cx("verifying")}
                    onClick={handleEmailVerify}
                  >
                    <p className={cx("desc")}>{t("verify")}</p>
                  </button>
                )}
              </div>
              <div className={cx("password")}>
                <h4 className={cx("title")}>{t("password")}:</h4>
                <strong className={cx("bold")}>••••••••</strong>
                <button
                  className={cx("change-password")}
                  onClick={handleChangePassword}
                >
                  <p className={cx("desc")}>{t("changePassword")}</p>
                </button>
              </div>
              {isChangePassword && (
                <PopUp
                  isOpen={isChangePassword}
                  closePopUp={closeChangePasswordPopUp}
                >
                  <ChangePassword />
                </PopUp>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default UserPage;
