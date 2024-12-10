import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import SidebarPlaylists from "./SidebarPlaylists";
import SidebarPlaylist from "./SidebarPlaylists/SidebarPlaylist";
import YourPlaylistItem from "~/components/YourPlaylistItem";
import SidebarSupports from "./SidebarSupports";

const cx = classNames.bind(styles);
function Sidebar() {
  return (
    <div className={cx("wrapper")}>
      <SidebarPlaylists>
        <SidebarPlaylist>
          <YourPlaylistItem />
        </SidebarPlaylist>
      </SidebarPlaylists>

      <SidebarSupports />
    </div>
  );
}

export default Sidebar;
