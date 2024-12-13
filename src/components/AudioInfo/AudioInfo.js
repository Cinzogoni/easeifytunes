import classNames from "classnames/bind";
import styles from "./AudioInfo.module.scss";

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
    <div className={cx("container")}>
      <div className={cx("search")}>
        <Searchbar />
      </div>

      <div className={cx("catalogue")}>
        <NewReleases />
        <TrendingSongs />
        <MusicMaker />
        <Album />
        <Podcast />
        {/* <Moment /> */}
      </div>
    </div>
  );
}

export default AudioInfo;
