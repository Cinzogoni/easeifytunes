import classNames from "classnames/bind";
import styles from "./Searchbar.module.scss";

import Tippy from "@tippyjs/react/headless";

import { useEffect, useState, useRef, useCallback, memo } from "react";
import { useDebounce } from "~/hooks";
import { useTrackInfo } from "../TrackInfoProvider";
import { useSearchFocus } from "../SearchFocusProvider/SearchFocusProvider";
import { useTranslation } from "react-i18next";

import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import MusicTrackItem from "../MusicTrackItem";
import MusicMakerItems from "../MusicMakerItems";
import AlbumItem from "../AlbumItem";
import PodcastItem from "../PodcastItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Searchbar() {
  const { musicMaker, podcast } = useTrackInfo();
  const { setFocus } = useSearchFocus();
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [activeTitle, setActiveTitle] = useState("Tracks");

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  const filterSearchResults = (searchValue, apiResults) => {
    const searchLowerCase = searchValue.toLowerCase();

    return apiResults.filter((item) => {
      return (
        (item.title && item.title.toLowerCase().includes(searchLowerCase)) ||
        (item.makerName &&
          item.makerName.toLowerCase().includes(searchLowerCase)) ||
        (item.role && item.role.toLowerCase().includes(searchLowerCase)) ||
        (item.audios &&
          item.audios.some(
            (audio) =>
              audio.publisher.toLowerCase().includes(searchLowerCase) ||
              audio.title.toLowerCase().includes(searchLowerCase)
          )) ||
        (item.albums &&
          item.albums.some(
            (album) =>
              album.albumName.toLowerCase().includes(searchLowerCase) ||
              album.albumPerformer.toLowerCase().includes(searchLowerCase)
          )) ||
        (item.topic && item.topic.toLowerCase().includes(searchLowerCase)) ||
        (item.description &&
          item.description.toLowerCase().includes(searchLowerCase))
      );
    });
  };

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const audioTracks = musicMaker.flatMap((maker) => [
      ...(maker.singles || []),
      ...(maker.albums?.flatMap((album) =>
        (album.tracks || []).map((track) => ({
          ...track,
          albumAvatar: album.albumAvatar,
        }))
      ) || []),
    ]);

    const apiResults = [...podcast, ...musicMaker, ...audioTracks];
    const filteredResults = filterSearchResults(debounced, apiResults);

    setSearchResult(filteredResults);
  }, [debounced, musicMaker, podcast]);

  const handleClear = useCallback(() => {
    setSearchValue(``);
    setSearchResult([]);
    inputRef.current.focus();
  }, []);

  const handleHideResult = useCallback(() => {
    setShowResult(false);
  }, []);

  const handleFocus = useCallback(() => {
    setShowResult(true);
    setFocus(true);
  }, [setFocus]);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, [setFocus]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("search-frame")}>
        <Tippy
          placement="bottom"
          interactive
          appendTo={document.body}
          visible={showResult && searchResult.length > 0}
          onClickOutside={handleHideResult}
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex={-1} {...attrs}>
              <div className={cx("title-box")}>
                <h5
                  className={cx("title-1", {
                    active: activeTitle === `Tracks`,
                  })}
                  onClick={() => setActiveTitle(`Tracks`)}
                >
                  {t("tracks")}
                </h5>
                <h5
                  className={cx("title-2", {
                    active: activeTitle === `Music Makers`,
                  })}
                  onClick={() => setActiveTitle(`Music Makers`)}
                >
                  {t("musicMaker")}
                </h5>
                <h5
                  className={cx("title-3", {
                    active: activeTitle === `Albums`,
                  })}
                  onClick={() => setActiveTitle(`Albums`)}
                >
                  {t("albums")}
                </h5>
                <h5
                  className={cx("title-4", {
                    active: activeTitle === `Podcast`,
                  })}
                  onClick={() => setActiveTitle(`Podcast`)}
                >
                  {t("podcast")}
                </h5>
              </div>
              <WrapperPopper>
                {/* Tracks */}
                {activeTitle === `Tracks` && (
                  <div className={cx("music-track")}>
                    {searchResult
                      .filter((item) => item.title)
                      .map((item) => (
                        <MusicTrackItem
                          key={`track_${item.id}`}
                          trackAvatar={item.avatar || item.albumAvatar}
                          trackPerformer={item.stageName}
                          trackTitle={item.title}
                          role={item.role}
                        />
                      ))}
                  </div>
                )}
                {/* Music Maker  */}
                {activeTitle === `Music Makers` && (
                  <div className={cx("music-maker")}>
                    {searchResult
                      .filter((item) => item.makerName && item.role)
                      .map((item) => (
                        <MusicMakerItems
                          key={`music-maker_${item.id}`}
                          musicMakerAvatar={item.makerAvatar}
                          musicMakerStageName={item.makerName}
                          musicMakerRole={item.role}
                        />
                      ))}
                  </div>
                )}
                {/* Album */}
                {activeTitle === `Albums` && (
                  <div className={cx("album")}>
                    {searchResult
                      .filter((item) => item.albums && item.albums.length > 0)
                      .map((albumItem) =>
                        albumItem.albums.map((track) => (
                          <AlbumItem
                            key={`album_${track.id}`}
                            albumAvatar={track.albumAvatar}
                            albumName={track.albumName}
                            albumPerformer={track.albumPerformer}
                          />
                        ))
                      )}
                  </div>
                )}
                {/* Podcast */}
                {activeTitle === `Podcast` && (
                  <div className={cx("podcast")}>
                    {searchResult
                      .filter((item) => item.topic && item.description)
                      .map((item) => (
                        <PodcastItem
                          key={`podcast_${item.id}`}
                          podcastAvatar={item.avatar}
                          podcastTopic={item.topic}
                          podcastDescription={item.description}
                        />
                      ))}
                  </div>
                )}
              </WrapperPopper>
            </div>
          )}
        >
          <div className={cx("input")}>
            <input
              ref={inputRef}
              className={cx("search-input")}
              placeholder={t("searchPlaceholder")}
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
  );
}

export default Searchbar;
