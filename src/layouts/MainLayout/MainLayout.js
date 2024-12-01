import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";

import Header from "./Header";
import AudioPlayer from "./AudioPlayer";

import PropTypes from "prop-types";
import Sidebar from "./SideBar/Sidebar";

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  return (
    <div className={cx("container")}>
      {/* ----- HEADER ----- */}
      <header className={cx("header")}>
        <Header />
      </header>

      {/* ----- MAIN ----- */}
      <main className={cx("main")}>
        <div className={cx("sidebar")}>
          <Sidebar />
        </div>

        <section className={cx("content")}>{children}</section>
      </main>

      {/* ----- FOOTER ----- */}
      <footer className={cx("footer")}>
        <AudioPlayer />
      </footer>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MainLayout;
