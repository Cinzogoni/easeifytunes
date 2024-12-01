import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import styles from "./TrackPopper.module.scss";
const cx = classNames.bind(styles);

import { useTranslation } from "react-i18next";

function TrackPopper({
  children,
  trackPerformer,
  trackTitle,
  trackType,
  trackGenre,
  releaseDay,
}) {
  const { t } = useTranslation();

  return (
    <Tippy
      render={(attrs) => (
        <>
          <div className={cx("info-box")} tabIndex={-1} {...attrs}>
            <h6 className={cx("desc")}>
              {t("performer")}: {trackPerformer}
            </h6>
            <h6 className={cx("desc")}>
              {t("title")}: {trackTitle}
            </h6>
            <h6 className={cx("desc")}>
              {t("type")}: {trackType}
            </h6>
            <h6 className={cx("desc")}>
              {t("genre")}: {trackGenre}{" "}
            </h6>
            <h6 className={cx("desc")}>
              {t("releaseDay")}: {releaseDay}
            </h6>
          </div>
          <div className={cx("triangle-box")}>
            <div className={cx("triangle")}></div>
          </div>
        </>
      )}
    >
      {children}
    </Tippy>
  );
}

export default TrackPopper;
