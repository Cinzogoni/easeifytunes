import classNames from "classnames/bind";
import styles from "./GridSystem.module.scss";
const cx = classNames.bind(styles);

import React from "react";
import { memo } from "react";

import { Fragment } from "react";
import GridSystem from "./GridSystem";

function RowColHomePage({ element1, element2, items }) {
  return (
    <GridSystem rowClass={cx("row")}>
      {React.cloneElement(element1, {
        children: (
          <Fragment>
            {items.map((item) => (
              <GridSystem
                key={item.id}
                colClass={cx("col")}
                colL={cx("l-2")}
                colML={cx("ml-2-5")}
                colM={cx("m-3")}
                colSM={cx("sm-3")}
                colS={cx("s-4")}
                colMo={cx("mo-6")}
              >
                {React.cloneElement(element2, {
                  trackId: item.id,
                  trackLink: item.link,
                  trackAvatar: item.avatar || item.albumAvatar,
                  trackTitle: item.title,
                  trackPerformer: item.stageName,
                  trackType: item.type,
                  trackGenre: item.genre,
                  releaseDay: item.releaseDay,
                  streamed: item.streamed,
                  //Music Maker
                  Id: item.id,
                  makerAvatar: item.makerAvatar,
                  makerName: item.makerName,
                  role: item.role,
                  //Album
                  albumId: item.id,
                  albumAvatar: item.albumAvatar,
                  albumName: item.albumName,
                  albumPerformer: item.albumPerformer,
                  //Podcast
                  podcastId: item.id,
                  podcastAvatar: item.avatar,
                  podcastTopic: item.topic,
                  podcastDescription: item.description,
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
