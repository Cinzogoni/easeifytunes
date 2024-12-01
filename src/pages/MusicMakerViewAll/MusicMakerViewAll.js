import classNames from "classnames/bind";
import styles from "./MusicMakerViewAll.module.scss";

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
import MusicMakerBox from "~/components/MusicMakerBox";
import MusicMakerItems from "~/components/MusicMakerItems";
import Navigation from "~/components/Navigation";

const cx = classNames.bind(styles);
function MusicMakerViewAll() {
  const { musicMaker } = useTrackInfo();
  const { setFocus } = useSearchFocus();
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState(``);
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const maker = musicMaker.map((maker) => ({ ...maker }));

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  const sortedMusicMakers = maker.slice().sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority ? -1 : 1;
    }

    const makerNameA = a.makerName || "";
    const makerNameB = b.makerName || "";

    return makerNameA.localeCompare(makerNameB);
  });

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }

    const filteredResults = musicMaker.filter((item) => {
      const searchLowerCase = debounced.toLowerCase();
      return (
        (item.makerName &&
          item.makerName.toLowerCase().includes(searchLowerCase)) ||
        (item.role && item.role.toLowerCase().includes(searchLowerCase))
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
                    .filter((item) => item.makerName && item.role)
                    .map((item) => (
                      <MusicMakerItems
                        key={item.id}
                        musicMakerAvatar={item.makerAvatar}
                        musicMakerStageName={item.makerName}
                        musicMakerRole={item.role}
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
                placeholder={t("musicMaker")}
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

        <div className={cx("musicMaker-box")}>
          <GridSystem rowClass={cx("row-1")}>
            {sortedMusicMakers.map((artist, index) => (
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
                    <MusicMakerBox
                      Id={artist.id}
                      makerAvatar={artist.makerAvatar}
                      makerName={artist.makerName}
                      role={artist.role}
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

export default MusicMakerViewAll;
