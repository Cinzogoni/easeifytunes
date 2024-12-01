import classNames from "classnames/bind";
import styles from "./AudioShareLink.module.scss";
const cx = classNames.bind(styles);

import { useState, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faLink } from "@fortawesome/free-solid-svg-icons";

import Tippy from "@tippyjs/react";

function AudioShareLink({ stageName, trackTitle, LinkFixSize }) {
  const [activeShare, setActiveShare] = useState(false);
  const [activeCopyLink, setActiveCopyLink] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);

  const host = window.location.origin;
  const audioTrack_URL = `${host}/track/${stageName.replace(
    /\//g,
    "-"
  )}/${trackTitle.replace(/\//g, "-")}`;

  const handleOpenShareLink = useCallback(() => {
    setShowShareLink((prev) => !prev);
    setActiveShare((prev) => !prev);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(audioTrack_URL)
      .then(() => {
        setActiveCopyLink(true);
        setTimeout(() => {
          setActiveCopyLink(false);
        }, 150);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <Tippy
      placement="top"
      interactive
      appendTo={document.body}
      visible={showShareLink}
      onClickOutside={() => {
        setShowShareLink(false), setActiveShare(false);
      }}
      render={(attrs) => (
        <div className={cx("box")} tabIndex={-1} {...attrs}>
          {showShareLink && (
            <div className={cx("box-link")}>
              <div className={cx("path")}>
                <h6 className={cx("url")}>{audioTrack_URL}</h6>
              </div>

              <div
                className={cx("copy-bg")}
                onClick={handleCopyLink}
                style={{
                  backgroundColor: activeCopyLink
                    ? "rgba(12, 12, 20, 1)"
                    : "rgba(255, 255, 255, 0.9)",
                }}
              >
                <div className={cx("copy-frame")}>
                  <FontAwesomeIcon className={cx("copy")} icon={faCopy} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    >
      <div
        className={cx("share-link")}
        onClick={handleOpenShareLink}
        style={{
          backgroundColor: activeShare
            ? "rgba(255, 255, 255, 1)"
            : "transparent",
        }}
      >
        <FontAwesomeIcon
          className={cx("link", { LinkFixSize })}
          icon={faLink}
          style={{
            color: activeShare
              ? "rgba(12, 12, 20,1)"
              : "rgba(255, 255, 255, 1)",
          }}
        />
      </div>
    </Tippy>
  );
}

export default AudioShareLink;
