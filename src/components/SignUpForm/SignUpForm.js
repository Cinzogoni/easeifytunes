import classNames from "classnames/bind";
import styles from "./SignUpForm.module.scss";
const cx = classNames.bind(styles);

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useModal } from "../ModalProvider";
import { useTranslation } from "react-i18next";
import { useUser } from "../UserProvider";

function SignUpForm({ onSignUp }) {
  const { t } = useTranslation();
  const { closeSignUpModal, openLoginModal } = useModal();
  const { user } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phoneExists, setPhoneExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const [passwordDesc, setPasswordDesc] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const phoneExistsCheck = user.find(
      (user) => user.phoneNumber === phoneNumber
    );
    const emailExistsCheck = user.find((user) => user.email === email);

    const passwordCheck =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        password
      );

    setPhoneExists(false);
    setEmailExists(false);
    setPasswordDesc(false);

    if (phoneExistsCheck) {
      setPhoneExists(true);
      return;
    }

    if (emailExistsCheck) {
      setEmailExists(true);
      return;
    }

    if (!passwordCheck) {
      setPasswordDesc(true);
      return;
    }

    onSignUp(fullName, phoneNumber, email, password);
  };

  const handleLoginForm = () => {
    closeSignUpModal();
    setTimeout(() => {
      openLoginModal();
    }, 100);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <form className={cx("form")} onSubmit={handleSubmit}>
          <h4 className={cx("title")}>{t("signUp")}</h4>

          <div className={cx("sign-up")}>
            <div className={cx("full-name")}>
              <div className={cx("box")}>
                <input
                  className={cx("frame")}
                  placeholder={t("fullName")}
                  type="text"
                  autoComplete="username"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className={cx("sign-up")}>
            <div className={cx("phone-number")}>
              <div className={cx("box")}>
                <input
                  placeholder={t("phoneNumber")}
                  className={cx("frame")}
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              {phoneExists && (
                <p className={cx("notification")}>{t("signUpPhoneNotify")}</p>
              )}
            </div>
          </div>

          <div className={cx("sign-up")}>
            <div className={cx("email")}>
              <div className={cx("box")}>
                <input
                  className={cx("frame")}
                  placeholder={t("email")}
                  type="text"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {emailExists && (
                <p className={cx("notification")}>{t("signUpEmailNotify")}</p>
              )}
            </div>
          </div>

          <div className={cx("sign-up")}>
            <div className={cx("password")}>
              <div className={cx("box")}>
                <input
                  className={cx("frame")}
                  placeholder={t("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <FontAwesomeIcon
                  className={cx("hide-show")}
                  icon={faEye}
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                />
              </div>
              {passwordDesc ? (
                <p className={cx("notification")}>{t("signUpPassDesc")}</p>
              ) : (
                <p className={cx("desc")}>{t("signUpPassDesc")}</p>
              )}
            </div>
          </div>

          <div className={cx("submit-bg")}>
            <button type="submit" className={cx("submit-button")}>
              <h5 className={cx("submit-text")}>{t("submit")}</h5>
            </button>
          </div>
        </form>

        <div className={cx("actions")}>
          <div onClick={handleLoginForm}>
            <h6 className={cx("action")}>
              {t("haveAccount")}{" "}
              <strong className={cx("link")}>{t("loginNow")}</strong>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
