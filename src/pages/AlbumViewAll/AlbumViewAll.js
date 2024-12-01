import classNames from "classnames/bind";
import styles from "./AlbumViewAll.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "~/hooks";
import { useTrackInfo } from "~/components/TrackInfoProvider";
import { useSearchFocus } from "~/components/SearchFocusProvider/SearchFocusProvider";
import { useTranslation } from "react-i18next";

import Tippy from "@tippyjs/react/headless";
import GridSystem from "~/components/GridSystem";
import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import AlbumBox from "~/components/AlbumBox";
import AlbumItem from "~/components/AlbumItem";
import Navigation from "~/components/Navigation";

const cx = classNames.bind(styles);
function AlbumViewAll() {
  const { musicMaker } = useTrackInfo();
  const { setFocus } = useSearchFocus();
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  const allAlbums = musicMaker.flatMap((album) => album.albums || []);

  const sortedAlbums = allAlbums.sort(
    (a, b) => new Date(b.releaseDay) - new Date(a.releaseDay)
  );

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const filteredResults = musicMaker.filter((item) => {
      const searchLowerCase = debounced.toLowerCase();

      return item.albums.some((track) =>
        track.albumName.toLowerCase().includes(searchLowerCase)
      );
    });

    setSearchResult(filteredResults);
  }, [debounced]);

  const handleClear = () => {
    setSearchValue(``);
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleFocus = () => {
    setShowResult(true);
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-bar")}>
        <div className={cx("search-frame")}>
          <Tippy
            placement="bottom"
            interactive
            appendTo={document.body}
            visible={showResult && searchResult.length > 0}
            onClickOutside={handleHideResult}
            render={(attrs) => (
              <div className={cx("search-result")} tabIndex={-1} {...attrs}>
                <WrapperPopper>
                  {searchResult
                    .filter((item) => item.albums && item.albums.length > 0)
                    .map((albumItem) =>
                      albumItem.albums.map((track) => (
                        <AlbumItem
                          key={track.id}
                          albumAvatar={track.albumAvatar}
                          albumName={track.albumName}
                          albumPerformer={track.albumPerformer}
                        />
                      ))
                    )}
                </WrapperPopper>
              </div>
            )}
          >
            <div className={cx("input")}>
              <input
                ref={inputRef}
                className={cx("search-input")}
                placeholder={t("albums")}
                spellCheck={false}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {!!searchValue && (
                <FontAwesomeIcon
                  className={cx("icon")}
                  icon={faXmark}
                  onClick={handleClear}
                />
              )}
            </div>
          </Tippy>
        </div>
      </div>

      <div className={cx("container")}>
        <div className={cx("back-home")}>
          <Navigation>
            <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
          </Navigation>
        </div>

        <div className={cx("album-box")}>
          <GridSystem rowClass={cx("row-1")}>
            {sortedAlbums.map((track) => (
              <GridSystem
                key={track.id}
                colClass={cx("col")}
                colL={cx("l-3")}
                colML={cx("ml-4")}
                colM={cx("m-6")}
                colSM={cx("sm-12")}
                colS={cx("s-12")}
                colMo={cx("mo-12")}
              >
                <div className={cx("frame")}>
                  <div className={cx("boxes")}>
                    <AlbumBox
                      key={track.id}
                      albumId={track.id}
                      albumAvatar={track.albumAvatar}
                      albumName={track.albumName}
                      albumPerformer={track.albumPerformer}
                    />
                  </div>
                </div>
              </GridSystem>
            ))}
          </GridSystem>
        </div>
      </div>
    </div>
  );
}

export default AlbumViewAll;
