import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

import logo from "~/assets/images/logo/logo.png";

import { useState } from "react";

import LoginService from "~/services/LoginService";
import SignUpService from "~/services/SignUpService";

import HeaderActions from "../HeaderActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { usePopUp } from "~/components/PopUpProvider";
import { useUser } from "~/components/UserProvider";
import { useTranslation } from "react-i18next";

import PopUp from "~/components/PopUp";
import LoginForm from "~/components/LoginForm";
import SignUpForm from "~/components/SignUpForm";
import ForgotPasswordForm from "~/components/ForgotPasswordForm";

function Header() {
  const { t } = useTranslation();
  const { currentUser, setCurrentUser, user } = useUser();
  const {
    isLoginOpen,
    isSignUpOpen,
    isForgotPasswordOpen,
    openLoginPopUp,
    closeLoginPopUp,
    openSignUpPopUp,
    closeSignUpPopUp,
    closeForgotPasswordPopUp,
  } = usePopUp();

  const [emailOrPhoneError, setEmailOrPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = (emailOrPhone, password) => {
    const { isValid } = LoginService(
      emailOrPhone,
      password,
      user,
      setEmailOrPhoneError,
      setPasswordError,
      setCurrentUser
    );

    if (isValid) {
      closeLoginPopUp();
    }
  };

  const handleSignUp = (fullName, phoneNumber, email, password) => {
    const newUser = SignUpService(fullName, phoneNumber, email, password);

    if (newUser) {
      alert(t("signUpSuccessful"));
      closeSignUpPopUp();
      setTimeout(() => {
        openLoginPopUp();
      }, 100);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <img className={cx("logo")} src={logo} alt="Logo" />
      {currentUser ? (
        <HeaderActions />
      ) : (
        <div className={cx("actions")}>
          <button className={cx("sign-up")} onClick={openSignUpPopUp}>
            <h5>{t("signUp")}</h5>
          </button>
          <button className={cx("log-in")} onClick={openLoginPopUp}>
            <h5 className={cx("action-btn")}>{t("login")}</h5>
          </button>
          <FontAwesomeIcon className={cx("menu")} icon={faBars} />
        </div>
      )}
      {isLoginOpen && (
        <PopUp isOpen={isLoginOpen} closePopUp={closeLoginPopUp}>
          <LoginForm
            onLogin={handleLogin}
            emailOrPhoneError={emailOrPhoneError}
            passwordError={passwordError}
          />
        </PopUp>
      )}

      {isSignUpOpen && (
        <PopUp isOpen={isSignUpOpen} closePopUp={closeSignUpPopUp}>
          <SignUpForm onSignUp={handleSignUp} />
        </PopUp>
      )}

      {isForgotPasswordOpen && (
        <PopUp
          isOpen={isForgotPasswordOpen}
          closePopUp={closeForgotPasswordPopUp}
        >
          <ForgotPasswordForm />
        </PopUp>
      )}
    </div>
  );
}

export default Header;
