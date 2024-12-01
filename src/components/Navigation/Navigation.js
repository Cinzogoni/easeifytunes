import classNames from "classnames/bind";
import styles from "./Navigation.module.scss";

import { Link } from "react-router-dom";

import config from "~/config";

const cx = classNames.bind(styles);

function Navigation({ id, children }) {
  let linkTo;

  switch (id) {
    case "new-releases-viewAll":
      linkTo = config.routes.newReleasesViewAll;
      break;
    case "music-maker-viewAll":
      linkTo = config.routes.musicMakersViewAll;
      break;
    case "album-viewAll":
      linkTo = config.routes.albumViewAll;
      break;
    case "podcast-viewAll":
      linkTo = config.routes.podcastViewAll;
      break;
    case "moment-viewAll":
      linkTo = config.routes.momentViewAll;
      break;
    default:
      linkTo = config.routes.home;
      break;
  }

  return (
    <Link to={linkTo} key={id}>
      {children}
    </Link>
  );
}

export default Navigation;
