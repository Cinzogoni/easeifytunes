import classNames from "classnames/bind";
import styles from "./MusicMakerAlbums.module.scss";
const cx = classNames.bind(styles);

import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

import GridSystem from "../GridSystem";
import routesConfig from "~/config/routes";

function MusicMakerAlbums({ musicAlbums }) {
  const { t } = useTranslation();

  const sortedMusicAlbums = musicAlbums
    .sort((a, b) => new Date(b.releaseDay) - new Date(a.releaseDay))
    .slice(0, musicAlbums.length);

  return (
    <div className={cx("container")}>
      <h2 className={cx("title")}>{t("albums")}</h2>

      <GridSystem rowClass={cx("row-1")}>
        {sortedMusicAlbums.map((album, index) => (
          <GridSystem
            key={index}
            colClass={cx("col")}
            colL={cx("l-2-5")}
            colML={cx("ml-4")}
            colM={cx("m-4")}
            colSM={cx("sm-6")}
            colS={cx("s-6")}
            colMo={cx("mo-12")}
          >
            <div className={cx("boxes")}>
              <div className={cx("album-box")}>
                <div className={cx("album-frame")}>
                  <Link
                    className={cx("album-link")}
                    to={routesConfig.albumPage
                      .replace(
                        `:albumPerformer`,
                        album.albumPerformer.replace(/\//g, "-")
                      )
                      .replace(
                        `:albumName`,
                        album.albumName.replace(/\//g, "-")
                      )}
                  />

                  <div className={cx("avatar-frame")}>
                    <img
                      className={cx("avatar")}
                      src={album.albumAvatar}
                      alt={album.albumName}
                    />
                  </div>

                  <div className={cx("desc")}>
                    <h5 className={cx("album-name")}>{album.albumName}</h5>
                    <h6 className={cx("album-performer")}>
                      {album.albumPerformer}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </GridSystem>
        ))}
      </GridSystem>
    </div>
  );
}

export default MusicMakerAlbums;
