import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import GridSystem from "~/components/GridSystem";

import SidebarPlaylists from "./SidebarPlaylists";
import SidebarPlaylist from "./SidebarPlaylists/SidebarPlaylist";
import YourPlaylistItem from "~/components/YourPlaylistItem";
import SidebarSupports from "./SidebarSupports";

const cx = classNames.bind(styles);
function Sidebar() {
  return (
    <div className={cx("wrapper")}>
      <GridSystem gridClass={cx("grid-sidebar")} wideClass={cx("wide-sidebar")}>
        <GridSystem rowClass={cx("row-sidebar")}>
          <GridSystem
            colL={cx("l-12-sb")}
            colML={cx("ml-12-sb")}
            colM={cx("m-12-sb")}
            colSM={cx("sm-12-sb")}
          >
            <SidebarPlaylists>
              <SidebarPlaylist>
                <YourPlaylistItem />
              </SidebarPlaylist>
            </SidebarPlaylists>
          </GridSystem>
        </GridSystem>

        <GridSystem rowClass={cx("row-sb")}>
          <GridSystem
            colL={cx("l-12")}
            colML={cx("ml-12")}
            colM={cx("m-12")}
            colSM={cx("sm-12")}
          >
            <SidebarSupports />
          </GridSystem>
        </GridSystem>
      </GridSystem>
    </div>
  );
}

export default Sidebar;
