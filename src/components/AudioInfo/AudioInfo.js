import classNames from "classnames/bind";
import styles from "./AudioInfo.module.scss";
import { Fragment } from "react";

import Searchbar from "../Searchbar";
import NewReleases from "../NewReleases";
import TrendingSongs from "../TrendingSongs";
import MusicMaker from "../MusicMaker";
import Album from "../Album";
import Podcast from "../Podcast";
import Moment from "../Moment";

const cx = classNames.bind(styles);
function AudioInfo() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("search")}>
        <Searchbar />
      </div>
      <div className={cx("container")}>
        <NewReleases />
        <div className={cx("separate")} />
        <TrendingSongs />
        <div className={cx("separate")} />
        <MusicMaker />
        <div className={cx("separate")} />
        <Album />
        <div className={cx("separate")} />
        <Podcast />

        {process.env.NODE_ENV === "development" ? (
          <Fragment>
            <div className={cx("separate")} />
            <Moment />
          </Fragment>
        ) : null}
      </div>
    </div>
  );
}

export default AudioInfo;
