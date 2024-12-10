import classNames from "classnames/bind";
import styles from "./MusicMakerItems.module.scss";

import { memo } from "react";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
function MusicMakerItems({
  musicMakerAvatar,
  musicMakerStageName,
  musicMakerRole,
}) {
  const { t } = useTranslation();

  const rolesSplit = (musicMakerRole || "")
    .split("/")
    .map((r) => t(`roles.${r.trim()}`));

  return (
    <div className={cx("wrapper")}>
      <Link
        to={routesConfig.musicMakerPage.replace(
          `:stageName`,
          musicMakerStageName
        )}
      >
        <div className={cx("info-box")}>
          <img
            className={cx("avatar")}
            src={musicMakerAvatar}
            alt={musicMakerStageName}
          />
          <div className={cx("info")}>
            <h6 className={cx("name")}>{musicMakerStageName}</h6>
            <p className={cx("role")}>{rolesSplit.join("/")}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(MusicMakerItems);
