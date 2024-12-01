import classNames from "classnames/bind";
import styles from "./ChangePassword.module.scss";
const cx = classNames.bind(styles);

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "../UserProvider";
import { usePopUp } from "../PopUpProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import ChangePasswordService from "~/services/ChangePassService";

function ChangePassword() {
  const { t } = useTranslation();
  const { currentUser, setCurrentUser } = useUser();
  const { openLoginPopUp, closeChangePasswordPopUp } = usePopUp();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [checkNewPassword, setCheckNewPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const passwordCheck =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    setWrongPassword(false);
    setCheckNewPassword(false);

    if (currentPassword !== currentUser.password) {
      setWrongPassword(true);
      return;
    }

    if (!passwordCheck.test(newPassword)) {
      setCheckNewPassword(true);
      return;
    }

    const isPasswordUpdated = ChangePasswordService(
      currentUser.id,
      currentPassword,
      newPassword
    );

    if (isPasswordUpdated) {
      setSubmitted(true);
      setCurrentUser({ ...currentUser, password: newPassword });

      // console.log("Change password updated:", currentUser);
    } else {
      setWrongPassword(true);
    }
  };

  const handlePasswordUpdated = () => {
    setCurrentUser(false);
    closeChangePasswordPopUp();
    setTimeout(() => {
      openLoginPopUp();
    }, 100);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {!submitted ? (
          <form className={cx("form")} onSubmit={handleSubmit}>
            <input className={cx("none")} type="text" autoComplete="username" />

            <h4 className={cx("title")}>{t("changePassword")}</h4>
            <div className={cx("insert")}>
              <h5 className={cx("text")}>{t("currentPassword")}</h5>
              <div className={cx("box")}>
                <input
                  className={cx("frame")}
                  type={showCurrentPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  className={cx("hide-show")}
                  icon={faEye}
                  onMouseDown={() => setShowCurrentPassword(true)}
                  onMouseUp={() => setShowCurrentPassword(false)}
                  onMouseLeave={() => setShowCurrentPassword(false)}
                />
              </div>
              {wrongPassword && (
                <p className={cx("wrong-password")}>{t("wrongPassword")}</p>
              )}
            </div>

            <div className={cx("insert")}>
              <h5 className={cx("text")}>{t("newPassword")}</h5>
              <div className={cx("box")}>
                <input
                  className={cx("frame")}
                  type={showNewPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <FontAwesomeIcon
                  className={cx("hide-show")}
                  icon={faEye}
                  onMouseDown={() => setShowNewPassword(true)}
                  onMouseUp={() => setShowNewPassword(false)}
                  onMouseLeave={() => setShowNewPassword(false)}
                />
              </div>
              {checkNewPassword && (
                <p className={cx("wrong-password")}>{t("signUpPassDesc")}</p>
              )}
            </div>

            <div className={cx("submit-bg")}>
              <button type="submit" className={cx("submit-button")}>
                <h5 className={cx("submit-text")}>{t("submit")}</h5>
              </button>
            </div>
          </form>
        ) : (
          <div className={cx("notifications")}>
            <h5 className={cx("notification")}>
              Password changed. Press OK to log in with the new password.
            </h5>
            <div className={cx("submit-bg")}>
              <button
                className={cx("submit-button")}
                onClick={handlePasswordUpdated}
              >
                <h4 className={cx("submit-text")}>OK</h4>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
