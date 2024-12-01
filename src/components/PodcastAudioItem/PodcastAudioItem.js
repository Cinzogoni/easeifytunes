import classNames from "classnames/bind";
import styles from "./PodcastAudioItem.module.scss";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

const cx = classNames.bind(styles);

function PodcastAudioItem({
  podcastAvatar,
  podcastTitle,
  podcastPublisher,
  podcastAuthor,
}) {
  return (
    <div className={cx("wrapper")}>
      <Link
        to={routesConfig.podcastAudioPage
          .replace(`:publisher`, podcastPublisher.replace(/\//g, "-"))
          .replace(`:title`, podcastTitle.replace(/\//g, "-"))}
      >
        <div className={cx("info")}>
          <img
            className={cx("avatar")}
            src={podcastAvatar}
            alt={`${podcastPublisher}&${podcastAuthor}`}
          />
          <div>
            <h6 className={cx("title")}>{podcastTitle}</h6>
            <p className={cx("publisher")}>{podcastPublisher}</p>
            <p className={cx("author")}>{podcastAuthor}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PodcastAudioItem;
