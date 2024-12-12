import classNames from "classnames/bind";
import styles from "./GridSystem.module.scss";
const cx = classNames.bind(styles);

import React from "react";
import { memo } from "react";

import { Fragment } from "react";
import GridSystem from "./GridSystem";

function RowColHomePage({ element1, element2, filteredTracks }) {
  return (
    <GridSystem rowClass={cx("row")}>
      {React.cloneElement(element1, {
        children: (
          <Fragment>
            {filteredTracks.map((track) => (
              <GridSystem
                key={track.id}
                colClass={cx("col")}
                colL={cx("l-2")}
                colML={cx("ml-2-5")}
                colM={cx("m-3")}
                colSM={cx("sm-3")}
                colS={cx("s-4")}
                colMo={cx("mo-6")}
              >
                {React.cloneElement(element2, {
                  trackId: track.id,
                  trackLink: track.link,
                  trackAvatar: track.avatar || track.albumAvatar,
                  trackTitle: track.title,
                  trackPerformer: track.stageName,
                  trackType: track.type,
                  trackGenre: track.genre,
                  releaseDay: track.releaseDay,
                  streamed: track.streamed,
                })}
              </GridSystem>
            ))}
          </Fragment>
        ),
      })}
    </GridSystem>
  );
}

export default memo(RowColHomePage);
