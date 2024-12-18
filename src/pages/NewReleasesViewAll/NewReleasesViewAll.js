import classNames from "classnames/bind";
import styles from "./NewReleasesViewAll.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "~/hooks";
import { useSearchFocus } from "~/components/SearchFocusProvider/SearchFocusProvider";

import Tippy from "@tippyjs/react/headless";
import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import GridSystem from "~/components/GridSystem";
import NewReleasesBox from "~/components/NewReleasesBox";
import MusicTrackItem from "~/components/MusicTrackItem";
import Navigation from "~/components/Navigation";

import { useTrackInfo } from "~/components/TrackInfoProvider";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
function NewReleasesViewAll() {
  const { musicMaker } = useTrackInfo();
  const { setFocus } = useSearchFocus();
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  const apiResults = musicMaker.flatMap((maker) => [
    ...maker.singles,
    ...maker.albums.flatMap((album) =>
      album.tracks.map((track) => ({
        ...track,
        avatar: album.albumAvatar || track.avatar,
      }))
    ),
  ]);

  const minimumReleaseDate = new Date("2024-10-01");

  const filteredTracks = apiResults.filter((track) => {
    const releaseDate = new Date(track.releaseDay);
    return releaseDate >= minimumReleaseDate;
  });

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const filteredResults = filteredTracks.filter((item) => {
      const searchLowerCase = debounced.toLowerCase();
      return item.title && item.title.toLowerCase().includes(searchLowerCase);
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
                  .filter((item) => item.title)
                  .map((item) => (
                    <MusicTrackItem
                      key={item.id}
                      trackAvatar={item.avatar}
                      trackPerformer={item.stageName}
                      trackTitle={item.title}
                    />
                  ))}
              </WrapperPopper>
            </div>
          )}
        >
          <div className={cx("input")}>
            <input
              ref={inputRef}
              className={cx("search-input")}
              placeholder={t("trackTitle")}
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
            {filteredTracks.map((track) => {
              return (
                <GridSystem
                  colClass={cx("col")}
                  key={track.id}
                  colL={cx("l-2")}
                  colML={cx("ml-2-5")}
                  colM={cx("m-3")}
                  colSM={cx("sm-3")}
                  colS={cx("s-4")}
                  colMo={cx("mo-6")}
                >
                  <div className={cx("boxes")}>
                    <NewReleasesBox
                      trackId={track.id}
                      trackAvatar={track.avatar}
                      trackLink={track.link}
                      trackTitle={track.title}
                      trackPerformer={track.stageName}
                      trackType={track.type}
                      trackGenre={track.genre}
                      releaseDay={track.releaseDay}
                      streamed={track.streamed}
                    />
                  </div>
                </GridSystem>
              );
            })}
          </GridSystem>
        </div>
      </div>
    </div>
  );
}

export default NewReleasesViewAll;
