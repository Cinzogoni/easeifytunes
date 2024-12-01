import classNames from "classnames/bind";
import styles from "./YourPlaylistItem.module.scss";
const cx = classNames.bind(styles);

import defaultAvatar from "~/assets/images/avatar/DefaultAvatar.png";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useYourPlaylist } from "../YourPlaylistProvider";

import { Link } from "react-router-dom";
import routesConfig from "~/config/routes";

function YourPlaylistItem({
  playlistItem,
  trackId,
  trackAvatar,
  trackTitle,
  trackPerformer,
  trackLink,
  trackGenre,
  releaseDay,
  trackType,
  streamed,
  //
  footerPlaylistFix,
  footerPlaylistItemTitle,
  footerPlaylistItemDesc,
  footerEdit,
  footerRemove,
}) {
  const { t } = useTranslation();

  const {
    handleDeletePlaylistItem,
    handleEditPlaylistItem,
    handleAddAudioTrack,
    setIsNewReleasesVisible,
    setActiveNewReleasesPlaylist,
    setShowNewReleasesPlaylist,
    chooseAudio,
    setChooseAudio,
    showCheckBox,
    setIsEditing,
  } = useYourPlaylist();

  const find = playlistItem.map((c) => c.audioTracks || []);
  const avatars = find.flat().map((a) => a.trackAvatar);

  const handleCheckBox = (index) => {
    if (!trackId) return;

    if (chooseAudio?.trackId === trackId && chooseAudio?.index === index) {
      setChooseAudio(null);
    } else {
      setChooseAudio({ trackId, index });
    }
  };

  const handleAddAudioToPlaylist = (playlistIndex) => {
    if (!trackId || !chooseAudio) return;

    const audioInfo = {
      trackId,
      trackAvatar,
      trackTitle,
      trackPerformer,
      trackLink,
      trackGenre,
      releaseDay,
      trackType,
      streamed,
    };

    handleAddAudioTrack(audioInfo, playlistIndex);
    setChooseAudio(null);
  };

  const currentUserName = playlistItem.map((info) => info.userName);
  const currentItemName = playlistItem.map((info) => info.yourPlaylistName);

  return (
    <div
      className={cx("wrapper")}
      style={{
        display:
          !Array.isArray(playlistItem) || playlistItem.length === 0
            ? "none"
            : "block",
      }}
    >
      {playlistItem.map((item, playlistIndex) => (
        <div key={playlistIndex} className={cx("frame")}>
          {chooseAudio?.trackId === trackId &&
            chooseAudio?.index === playlistIndex && (
              <div className={cx("add-track")}>
                <button
                  style={{
                    fontSize: "0.6rem",
                    color: "rgba(12, 12, 20, 1)",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAddAudioToPlaylist(playlistIndex)}
                >
                  {t("addAudio")}
                </button>
              </div>
            )}

          <div className={cx("box")}>
            <Link
              className={cx("link")}
              to={routesConfig.yourPlaylistPage
                .replace(
                  `:userName`,
                  item.userName?.replace(/\//g, "-") || "defaultUserName"
                )
                .replace(
                  `:yourPlaylistName`,
                  item.yourPlaylistName?.replace(/\//g, "-") ||
                    "defaultPlaylistName"
                )}
            />

            <div className={cx("playlist", { footerPlaylistFix })}>
              <div className={cx("image")}>
                <div className={cx("avatar-frame")}>
                  <img
                    className={cx("default-avatar")}
                    src={defaultAvatar}
                    alt="default avatar"
                  />

                  {avatars && avatars.length >= 5 && (
                    <>
                      {avatars.slice(0, 5).map((avatar, index) => (
                        <img
                          key={index}
                          className={cx(`avatar-${index}`)}
                          src={avatar}
                          alt={
                            item.yourPlaylistName ||
                            item.yourPlaylistDescription ||
                            ""
                          }
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className={cx("info")}>
                <h5 className={cx("title", { footerPlaylistItemTitle })}>
                  {item.yourPlaylistName}
                </h5>
                <h6 className={cx("desc", { footerPlaylistItemDesc })}>
                  {item.yourPlaylistDescription}
                </h6>
              </div>

              <div className={cx("actions")}>
                {trackId && showCheckBox && (
                  <div className={cx("check-box")}>
                    <input
                      type="checkbox"
                      className={cx("tick-box")}
                      checked={
                        chooseAudio?.trackId === trackId &&
                        chooseAudio?.index === playlistIndex
                      }
                      onChange={() => handleCheckBox(playlistIndex)}
                    />
                  </div>
                )}

                <div className={cx("action-1")}>
                  <FontAwesomeIcon
                    className={cx("edit", { footerEdit })}
                    icon={faFilePen}
                    onClick={() => {
                      handleEditPlaylistItem(
                        item.itemName,
                        item.itemDescription,
                        playlistIndex
                      );
                      setIsNewReleasesVisible(false);
                      setActiveNewReleasesPlaylist(false);
                      setShowNewReleasesPlaylist(false);
                      setIsEditing(true);
                    }}
                  />
                </div>

                <div className={cx("action")}>
                  <FontAwesomeIcon
                    className={cx("remove", { footerRemove })}
                    icon={faXmark}
                    onClick={() =>
                      handleDeletePlaylistItem(
                        playlistIndex,
                        currentUserName,
                        currentItemName
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={cx("divider")}>
        <hr />
      </div>
    </div>
  );
}

export default YourPlaylistItem;
