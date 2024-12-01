import classNames from "classnames/bind";
import styles from "./SidebarSupports.module.scss";

import { useCallback, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "~/components/LanguageProvider";
import { useTranslation } from "react-i18next";

import Tippy from "@tippyjs/react";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);
function SidebarSupports() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);

  const handleShowHide = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return (
    <div className={cx("supports")}>
      <div className={cx("helps")}>
        <Link to={routesConfig.aboutUs}>
          <h6 className={cx("title")}>{t("aboutUs")}</h6>
        </Link>
        <Link to={routesConfig.helpCenter}>
          <h6 className={cx("title")}>{t("helpCenter")}</h6>
        </Link>
        <Link to={routesConfig.policy}>
          <h6 className={cx("title")}>{t("policy")}</h6>
        </Link>
      </div>

      <Tippy
        placement="top"
        interactive
        appendTo={document.body}
        visible={visible}
        onClickOutside={() => setVisible(false)}
        render={(attrs) =>
          visible && (
            <div className={cx("change-lang")} tabIndex={-1} {...attrs}>
              <button
                className={cx("lang")}
                onClick={() => {
                  changeLanguage("vi");
                  setVisible(true);
                }}
              >
                <h4
                  className={cx("choose-lang")}
                  style={{
                    color:
                      currentLanguage === "vi"
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.7)",
                    transform:
                      currentLanguage === "vi" ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.01s ease-in-out",
                  }}
                >
                  Tiếng Việt
                </h4>
              </button>

              <button
                className={cx("lang")}
                onClick={() => {
                  changeLanguage("en");
                  setVisible(true);
                }}
              >
                <h4
                  className={cx("choose-lang")}
                  style={{
                    color:
                      currentLanguage === "en"
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.7)",
                    transform:
                      currentLanguage === "en" ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.01s ease-in-out",
                  }}
                >
                  English
                </h4>
              </button>

              <button
                className={cx("lang")}
                onClick={() => {
                  changeLanguage("zh");
                  setVisible(true);
                }}
              >
                <h4
                  className={cx("choose-lang")}
                  style={{
                    color:
                      currentLanguage === "zh"
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.7)",
                    transform:
                      currentLanguage === "zh" ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.01s ease-in-out",
                  }}
                >
                  中文
                </h4>
              </button>

              <button
                className={cx("lang")}
                onClick={() => {
                  changeLanguage("ko");
                  setVisible(true);
                }}
              >
                <h4
                  className={cx("choose-lang")}
                  style={{
                    color:
                      currentLanguage === "ko"
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.7)",
                    transform:
                      currentLanguage === "ko" ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.01s ease-in-out",
                  }}
                >
                  한국어
                </h4>
              </button>

              <button
                className={cx("lang")}
                onClick={() => {
                  changeLanguage("ja");
                  setVisible(true);
                }}
              >
                <h4
                  className={cx("choose-lang")}
                  style={{
                    color:
                      currentLanguage === "ja"
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.7)",
                    transform:
                      currentLanguage === "ja" ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.01s ease-in-out",
                  }}
                >
                  日本語
                </h4>
              </button>
            </div>
          )
        }
      >
        <button className={cx("languages")} onClick={handleShowHide}>
          <FontAwesomeIcon className={cx("icon")} icon={faGlobe} />
          <h4 className={cx("choose")}>{t("language")}</h4>
        </button>
      </Tippy>
    </div>
  );
}

export default SidebarSupports;
