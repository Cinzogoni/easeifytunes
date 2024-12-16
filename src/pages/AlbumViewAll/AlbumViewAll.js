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

      <div className={cx("container")}>
        <div className={cx("back")}>
          <Navigation>
            <FontAwesomeIcon className={cx("arrow-left")} icon={faArrowLeft} />
          </Navigation>
        </div>

        <div className={cx("frame")}>
          <GridSystem rowClass={cx("row-1")}>
            {sortedAlbums.map((album) => (
              <GridSystem
                key={album.id}
                colClass={cx("col")}
                colL={cx("l-2")}
                colML={cx("ml-2-5")}
                colM={cx("m-3")}
                colSM={cx("sm-3")}
                colS={cx("s-4")}
                colMo={cx("mo-6")}
              >
                <div className={cx("boxes")}>
                  <AlbumBox
                    key={album.id}
                    albumId={album.id}
                    albumAvatar={album.albumAvatar}
                    albumName={album.albumName}
                    albumPerformer={album.albumPerformer}
                  />
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
