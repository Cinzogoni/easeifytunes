import classNames from "classnames/bind";
import styles from "./PodcastPage.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "~/hooks";
import { useParams } from "react-router-dom";

import Tippy from "@tippyjs/react/headless";
import WrapperPopper from "~/layouts/MainLayout/Popper/WrapperPopper";
import PodcastAudioItem from "~/components/PodcastAudioItem";
import PodcastInfo from "~/components/PodcastInfo";
import PodcastAudioList from "~/components/PodcastAudioList";

import { useTrackInfo } from "~/components/TrackInfoProvider";
import { useSearchFocus } from "~/components/SearchFocusProvider/SearchFocusProvider";
import { useTranslation } from "react-i18next";

import Track from "~/components/Track";

const cx = classNames.bind(styles);

function PodcastPage() {
  const { t } = useTranslation();
  const { podcast } = useTrackInfo();
  const { topic } = useParams();
  const { setFocus } = useSearchFocus();

  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();
  const debounced = useDebounce(searchValue, 500);

  const isPodcast = podcast.flatMap((audio) =>
    audio.audios.map((inner) => ({
      ...inner,
      avatar: audio.avatar,
      topic: audio.topic,
      description: audio.description,
      mode: audio.mode,
      care: audio.care,
    }))
  );

  const findAllTopic = isPodcast.filter((t) => t.topic === topic);
  const audioList = findAllTopic;

  // console.log(isPodcast);
  // console.log(audioList);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    const searchLowerCase = debounced.toLowerCase();

    const filteredResults = audioList.filter(
      (audio) =>
        audio.publisher.toLowerCase().includes(searchLowerCase) ||
        audio.author.toLowerCase().includes(searchLowerCase) ||
        audio.title.toLowerCase().includes(searchLowerCase)
    );

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
                  <div className={cx("podcast-list")}>
                    {searchResult.map((audio) => (
                      <PodcastAudioItem
                        key={audio.id}
                        podcastAvatar={audio.audioAvatar}
                        podcastTitle={audio.title}
                        podcastPublisher={audio.publisher}
                        podcastAuthor={audio.author}
                      />
                    ))}
                  </div>
                </WrapperPopper>
              </div>
            )}
          >
            <div className={cx("input")}>
              <input
                ref={inputRef}
                className={cx("search-input")}
                placeholder={t("podcastPlaceholder")}
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

      <Track
        info={<PodcastInfo podcastInfo={findAllTopic} />}
        list={<PodcastAudioList audioList={audioList} />}
      />
    </div>
  );
}

export default PodcastPage;
