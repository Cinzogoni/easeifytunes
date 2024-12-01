import styles from "./SidebarPlaylist.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import React from "react";

function SidebarPlaylist({ children, handleAddPlaylistItem, playlistItem }) {
  return (
    <div className={cx("wrapper")}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { handleAddPlaylistItem, playlistItem })
      )}
    </div>
  );
}

export default SidebarPlaylist;
