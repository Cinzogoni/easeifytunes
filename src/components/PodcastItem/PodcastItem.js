import classNames from "classnames/bind";
import styles from "./PodcastItem.module.scss";

import { memo } from "react";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function PodcastItem({ podcastAvatar, podcastTopic, podcastDescription }) {
  const { t } = useTranslation();

  return (
    <div className={cx("wrapper")}>
      <Link to={routesConfig.podcastPage.replace(`:topic`, podcastTopic)}>
        <div className={cx("audio-info")}>
          <img
            className={cx("avatar")}
            src={podcastAvatar}
            alt={t(`topics.${podcastTopic}`)}
          />
          <div className={cx("info")}>
            <h6 className={cx("topic")}>{t(`topics.${podcastTopic}`)}</h6>
            <p className={cx("description")}>
              {t(`description.${podcastDescription}`)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default memo(PodcastItem);
