import classNames from "classnames/bind";
import styles from "./AudioInfo.module.scss";

import Searchbar from "../Searchbar";

import GridSystem from "../GridSystem";
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
      <div className={cx("container")}>
        <div className={cx("search")}>
          <Searchbar />
        </div>

        <div className={cx("audios")}>
          <GridSystem gridClass={cx("grid")} wideClass={cx("wide")}>
            <NewReleases />
            {/* <TrendingSongs /> */}
            {/* <MusicMaker /> */}
            {/* <Album /> */}
            {/* <Podcast /> */}
            {/* <Moment /> */}
          </GridSystem>
        </div>
      </div>
    </div>
  );
}

export default AudioInfo;
