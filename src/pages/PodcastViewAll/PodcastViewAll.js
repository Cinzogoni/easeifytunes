import classNames from "classnames/bind";
import styles from "./PodcastViewAll.module.scss";

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
import PodcastBox from "~/components/PodcastBox";
import PodcastItem from "~/components/PodcastItem";
import Navigation from "~/components/Navigation";

import apiPodcast from "~/Api/API_01";

const cx = classNames.bind(styles);

function PodcastViewAll() {
  const { podcast } = useTrackInfo();
  const { setFocus } = useSearchFocus();
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const apiResults = [...apiPodcast.getPodcast()];

    const filteredResults = apiResults.filter((item) => {
      const searchLowerCase = debounced.toLowerCase();

      return item.topic.toLowerCase().includes(searchLowerCase);
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
                    .filter((item) => item.topic && item.description)
                    .map((item) => (
                      <PodcastItem
                        key={`podcast_${item.id}`}
                        podcastAvatar={item.avatar}
                        podcastTopic={item.topic}
                        podcastDescription={item.description}
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
                placeholder={t("podcastTopicSearch")}
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

        <div className={cx("podcast-box")}>
          <GridSystem rowClass={cx("row-1")}>
            {podcast.map((podcast, index) => (
              <GridSystem
                key={index}
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
                    <PodcastBox
                      podcastId={`podcast_${podcast.id}`}
                      podcastAvatar={podcast.avatar}
                      podcastTopic={podcast.topic}
                      podcastDescription={podcast.description}
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

export default PodcastViewAll;
