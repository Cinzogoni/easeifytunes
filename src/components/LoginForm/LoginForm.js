import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";
const cx = classNames.bind(styles);

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { usePopUp } from "../PopUpProvider";

function LoginForm({ onLogin, emailOrPhoneError, passwordError }) {
  const { t } = useTranslation();
  const { closeLoginPopUp, openSignUpPopUp, openForgotPasswordPopUp } =
    usePopUp();
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(emailOrPhone, password);
  };

  const handleForgotPassword = () => {
    closeLoginPopUp();
    setTimeout(() => {
      openForgotPasswordPopUp();
    }, 100);
  };

  const handleSignUpForm = () => {
    closeLoginPopUp();
    setTimeout(() => {
      openSignUpPopUp();
    }, 100);
  };

  useEffect(() => {
    // console.log(emailOrPhoneError, passwordError);
  }, [emailOrPhoneError, passwordError, emailOrPhone, password]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <form className={cx("form")} onSubmit={handleSubmit}>
          <h4 className={cx("title")}>{t("login")}</h4>
          <div className={cx("login")}>
            <h5 className={cx("text")}>{t("emailOrPhone")}</h5>
            <div className={cx("box")}>
              <input
                className={cx("frame")}
                type="text"
                autoComplete="email"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>
            {emailOrPhoneError && (
              <p className={cx("notification")}>
                {t("loginEmailOrPhoneNotify")}
              </p>
            )}
          </div>

          <div className={cx("login")}>
            <h5 className={cx("text")}>{t("password")}</h5>
            <div className={cx("box")}>
              <input
                className={cx("frame")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                className={cx("hide-show")}
                icon={faEye}
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
              />
            </div>
            {passwordError && (
              <p className={cx("notification")}>{t("loginPasswordNotify")}</p>
            )}
          </div>

          <div className={cx("submit-bg")}>
            <button type="submit" className={cx("submit-button")}>
              <h5 className={cx("submit-text")}>{t("submit")}</h5>
            </button>
          </div>
        </form>

        <div className={cx("actions")}>
          <div onClick={handleForgotPassword}>
            <h6 className={cx("action")}>{t("forgotPassword")}</h6>
          </div>
          <div className={cx("gap")}></div>
          <div onClick={handleSignUpForm}>
            <h6 className={cx("action")}>{t("signUpNow")}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
