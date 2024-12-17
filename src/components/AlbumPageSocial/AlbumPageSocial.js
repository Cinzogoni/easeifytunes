import classNames from "classnames/bind";
import styles from "./AlbumPageSocial.module.scss";
const cx = classNames.bind(styles);

import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import GridSystem from "../GridSystem";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

function AlbumPageSocial({ socialAlbums }) {
  const { t } = useTranslation();
  const [shuffledAlbums, setShuffledAlbums] = useState([]);
  const isShuffled = useRef(false);

  useEffect(() => {
    if (!isShuffled.current && socialAlbums.length > 0) {
      const shuffled = [...socialAlbums]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);

      setShuffledAlbums(shuffled);
      isShuffled.current = true;
    }
  }, [socialAlbums]);

  return (
    <div className={cx("wrapper")}>
      <h6 className={cx("title")}>{t("suggestions")}</h6>
      <div className={cx("container")}>
        <GridSystem rowClass={cx("row")}>
          {shuffledAlbums.map((album, index) => (
            <GridSystem
              key={index}
              colClass={cx("col")}
              colL={cx("l-2")}
              colML={cx("ml-2")}
              colM={cx("m-3")}
              colSM={cx("sm-3")}
              colS={cx("s-3")}
            >
              <div className={cx("boxes")}>
                <div className={cx("box")}>
                  <Link
                    className={cx("link")}
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
                  <img
                    className={cx("avatar")}
                    src={album.albumAvatar}
                    alt={album.albumName}
                  />
                  <h6 className={cx("album-name")}>{album.albumName}</h6>
                </div>
              </div>
            </GridSystem>
          ))}
        </GridSystem>
      </div>
    </div>
  );
}

export default AlbumPageSocial;
