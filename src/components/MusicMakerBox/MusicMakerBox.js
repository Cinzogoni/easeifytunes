import classNames from "classnames/bind";
import styles from "./MusicMakerBox.module.scss";
const cx = classNames.bind(styles);

import routesConfig from "~/config/routes";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

function MusicMakerBox({ makerAvatar, makerName, role }) {
  const { t } = useTranslation();
  const rolesSplit = (role || "").split("/").map((r) => t(`roles.${r.trim()}`));

  return (
    <div className={cx("container")}>
      <Link
        className={cx("link")}
        to={routesConfig.musicMakerPage.replace(`:stageName`, makerName)}
      />

      <div className={cx("frame")}>
        <img className={cx("avatar")} src={makerAvatar} alt={makerName} />

        <div className={cx("desc")}>
          <h5 className={cx("name")}>{makerName}</h5>
          <h6 className={cx("role")}>{rolesSplit.join("/")}</h6>
        </div>
      </div>
    </div>
  );
}

export default MusicMakerBox;
