import classNames from "classnames/bind";
import styles from "./ForgotPasswordForm.module.scss";
const cx = classNames.bind(styles);

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useModal } from "../ModalProvider";
// import { useUser } from "../UserProvider";

function ForgotPasswordForm() {
  const { t } = useTranslation();
  // const { user } = useUser();
  const { closeForgotPasswordModal, openLoginModal } = useModal();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleLoginForm = () => {
    openLoginModal();
    closeForgotPasswordModal();
    setSubmitted(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {!submitted ? (
          <form className={cx("form")} onSubmit={handleSubmit}>
            <h4 className={cx("title")}>{t("resetPassword")}</h4>

            <div className={cx("insert")}>
              <h5 className={cx("text")}>{t("emailOrPhone")}</h5>
              <div className={cx("box")}>
                <input
                  className={cx("frame")}
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
              </div>
            </div>

            <div className={cx("submit-bg")}>
              <button type="submit" className={cx("submit-button")}>
                <h5 className={cx("submit-text")}>{t("submit")}</h5>
              </button>
            </div>
          </form>
        ) : (
          <div className={cx("notifications")}>
            <h5 className={cx("notification")}>{t("forgotPasswordNotify")}</h5>

            <h6 className={cx("action")} onClick={handleLoginForm}>
              <strong className={cx("bold")}>{t("loginNow")}</strong>
            </h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
