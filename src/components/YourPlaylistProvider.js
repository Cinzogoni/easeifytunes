import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  // useCallback,
} from "react";

import { useUser } from "./UserProvider";
import { useModal } from "./ModalProvider";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import Modal from "./Modal/Modal";
import YourPlaylistAdd from "./YourPlaylistAdd";

const YourPlaylistStates = createContext();

export function YourPlaylistProvider({ children }) {
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const {
    openAddPlaylistItemModal,
    closeAddPlaylistItemModal,
    isAddPlaylistItem,
    openLoginModal,
  } = useModal();

  const navigate = useNavigate();

  const [activePlaylist, setActivePlaylist] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showNotify, setShowNotify] = useState(false);

  const [isNewReleasesVisible, setIsNewReleasesVisible] = useState(false);
  const [activeNewReleasesPlaylist, setActiveNewReleasesPlaylist] =
    useState(false);
  const [showNewReleasesPlaylist, setShowNewReleasesPlaylist] = useState(false);
  const [showNewReleasesNotify, setShowNewReleasesNotify] = useState(false);

  const [playlistItem, setPlaylistItem] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const [clickSidebarAdd, setClickSidebarAdd] = useState(false);
  const [clickFooterAdd, setClickFooterAdd] = useState(false);

  const [trackId, setTrackId] = useState("");
  const [itemIndex, setItemIndex] = useState(null);

  const [chooseAudio, setChooseAudio] = useState(null);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [audioTrack, setAudioTrack] = useState([]);
  const [activeDelete, setActiveDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();
  const isOnMusicMakerPage = location.pathname.startsWith("/musicMakerPage");
  const isOnTrackPage = location.pathname.startsWith("/track");
  const isOnHome = location.pathname.startsWith("/");

  const handleToggleYourPlaylist = () => {
    setIsEditing(false);

    if (currentUser) {
      setIsVisible((prev) => !prev);
      setActivePlaylist((prev) => !prev);
      setShowPlaylist((prev) => !prev);
      setShowNotify(false);

      setClickSidebarAdd(true);
      setClickFooterAdd(true);

      setIsNewReleasesVisible(false);
      setActiveNewReleasesPlaylist(false);
      setShowNewReleasesPlaylist(false);
      setShowNewReleasesNotify(false);
      setShowCheckBox(false);
    }

    if (!currentUser) {
      setIsVisible((prev) => !prev);
      setShowNotify(true);

      setIsNewReleasesVisible(false);
      setShowNewReleasesNotify(false);
      setShowCheckBox(false);
    }
  };

  useLayoutEffect(() => {
    if (isOnMusicMakerPage) {
      setIsNewReleasesVisible(false);
      setActiveNewReleasesPlaylist(false);
      setShowNewReleasesPlaylist(false);
    }

    if (isOnTrackPage) {
      setIsNewReleasesVisible(false);
      setActiveNewReleasesPlaylist(false);
      setShowNewReleasesPlaylist(false);
    }

    if (isOnHome) {
      setIsNewReleasesVisible(false);
      setActiveNewReleasesPlaylist(false);
      setShowNewReleasesPlaylist(false);
    }
  }, [isOnMusicMakerPage, isOnTrackPage, isOnHome]);

  const handleToggleYourPlaylist1 = (trackId) => {
    setIsEditing(false);

    const toggleState = (prev) => (prev === trackId ? "" : trackId);

    if (currentUser) {
      setIsNewReleasesVisible(toggleState);
      setActiveNewReleasesPlaylist(toggleState);
      setShowNewReleasesPlaylist(toggleState);
      setShowCheckBox(true);

      setTrackId(toggleState);
      setChooseAudio(toggleState);
      setShowNewReleasesNotify(false);

      setActivePlaylist(false);
      setIsVisible(false);
      setShowPlaylist(false);
      setShowNotify(false);
    }

    if (!currentUser) {
      setIsNewReleasesVisible(toggleState);
      setShowCheckBox(false);
      setShowNewReleasesNotify(true);

      setIsVisible(false);
      setShowNotify(false);
    }
  };

  const handleAddPlaylistModal = () => {
    if (currentUser) {
      setIsNewReleasesVisible(false);
      setActiveNewReleasesPlaylist(false);
      setShowNewReleasesPlaylist(false);
      openAddPlaylistItemModal();
    }

    if (!currentUser) {
      setClickSidebarAdd(false);
      setClickFooterAdd(false);

      openLoginModal();
    }
  };

  const handleAddPlaylistModal1 = () => {
    if (currentUser) {
      setIsNewReleasesVisible(false);
      setActiveNewReleasesPlaylist(false);
      setShowNewReleasesPlaylist(false);
      openAddPlaylistItemModal();
    }

    if (!currentUser) {
      openLoginModal();
    }
  };

  const handleAddPlaylistItem = () => {
    setIsEditing(false);

    if (itemIndex !== null) {
      const updatedPlaylist = playlistItem.map((item, index) =>
        index === itemIndex
          ? {
              ...item,
              yourPlaylistName: itemName,
              yourPlaylistDescription: itemDescription,
              audioTracks: [...audioTrack],
            }
          : item
      );

      setPlaylistItem(updatedPlaylist);

      const updatedUser = {
        ...currentUser,
        yourPlaylist: updatedPlaylist,
      };

      setItemIndex(null);
    } else {
      const newPlaylistItem = {
        userName: currentUser.userName,
        yourPlaylistName: itemName,
        yourPlaylistDescription: itemDescription,
        audioTracks: [],
      };

      setPlaylistItem((prevPlaylist) => [...prevPlaylist, newPlaylistItem]);

      const updatedUser = {
        ...currentUser,
        yourPlaylist: [...playlistItem, newPlaylistItem],
      };
    }

    setItemName("");
    setItemDescription("");
    closeAddPlaylistItemModal();
  };

  const handleDeletePlaylistItem = (
    index,
    currentUserName,
    currentItemName
  ) => {
    const yourPlaylistPath = `/yourPlaylistPage/${currentUserName}/${currentItemName}`;

    setIsEditing(false);

    const isConfirmed = window.confirm(t("deletePlaylistItem"));

    if (isConfirmed) {
      const itemToDelete = playlistItem[index];

      const isMatchingPath =
        itemToDelete &&
        `/yourPlaylistPage/${itemToDelete.userName}/${itemToDelete.yourPlaylistName}` ===
          yourPlaylistPath;

      if (isMatchingPath) {
        const updatedPlaylist = playlistItem.filter((_, i) => i !== index);
        setPlaylistItem(updatedPlaylist);
      }

      navigate("/");
    }
  };

  const handleUpdatePlaylistItem = (name, description) => {
    setItemName(name);
    setItemDescription(description);
  };

  const handleEditPlaylistItem = (name, description, index) => {
    const selectedPlaylist = playlistItem[index];
    if (selectedPlaylist) {
      setAudioTrack(selectedPlaylist.audioTracks || []);
      setItemIndex(index);
      setItemName(name);
      setItemDescription(description);
    }

    openAddPlaylistItemModal();
  };

  const handleAddAudioTrack = (audioInfo, playlistIndex) => {
    setIsEditing(false);
    if (!currentUser) return;

    const updatedPlaylist = playlistItem.map((item, index) => {
      if (index === playlistIndex) {
        const trackExists = item.audioTracks.some(
          (track) => track.trackId === audioInfo.trackId
        );
        if (trackExists) {
          alert(t("trackAlreadyExists"));
          return item;
        }

        return {
          ...item,
          audioTracks: [...item.audioTracks, audioInfo],
        };
      }
      return item;
    });

    setPlaylistItem(updatedPlaylist);

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        yourPlaylist: updatedPlaylist,
      };
    }

    alert(t("trackAddedSuccessfully"));
  };

  const handleDeleteAudioTrack = (trackId, playlistIndex, audioIndex) => {
    setIsEditing(false);
    const isConfirmed = window.confirm(t("confirmDeleteTrack"));

    if (isConfirmed) {
      const updatedPlaylistItem = [...playlistItem];
      const targetPlaylist = updatedPlaylistItem[playlistIndex];

      if (targetPlaylist) {
        const updatedAudioTracks = targetPlaylist.audioTracks.filter(
          (track, index) => !(track.trackId === trackId && index === audioIndex)
        );

        updatedPlaylistItem[playlistIndex] = {
          ...targetPlaylist,
          audioTracks: updatedAudioTracks,
        };

        setPlaylistItem(updatedPlaylistItem);

        alert(t("trackDeletedSuccess"));
      }
    } else {
      setActiveDelete(null);
    }
  };

  useEffect(() => {
    const savedPlaylistItem = localStorage.getItem("playlistItem");
    if (savedPlaylistItem) {
      setPlaylistItem(JSON.parse(savedPlaylistItem));
    }
  }, []);

  useEffect(() => {
    if (playlistItem && playlistItem.length > 0) {
      localStorage.setItem("playlistItem", JSON.stringify(playlistItem));
    } else {
      localStorage.removeItem("playlistItem");
    }

    // console.log(playlistItem);
  }, [playlistItem]);

  useEffect(() => {
    const savedAudioTracks = localStorage.getItem("audioTrack");
    if (savedAudioTracks) {
      setAudioTrack(JSON.parse(savedAudioTracks));
    }
  }, []);

  useEffect(() => {
    if (audioTrack && audioTrack.length > 0) {
      localStorage.setItem("audioTrack", JSON.stringify(audioTrack));
    } else {
      localStorage.removeItem("audioTrack");
    }
    // console.log("Audio tracks:", audioTrack);
  }, [audioTrack]);

  useEffect(() => {
    // console.log("State changed:");
    // console.log("clickSidebarAdd:", clickSidebarAdd);
    // console.log("clickFooterAdd:", clickFooterAdd);
    // console.log("isAddPlaylistItem:", isAddPlaylistItem);
  }, [clickSidebarAdd, clickFooterAdd, isAddPlaylistItem]);

  useEffect(() => {
    // console.log("Visible:", isVisible);
    // console.log("Active playlist:", activePlaylist);
    // console.log("Show playlist:", showPlaylist);
    // console.log("Show Notify:", showNotify);
  }, [isVisible, showPlaylist, activePlaylist, showNotify]);

  useEffect(() => {
    // console.log("New Releases Visible:", isNewReleasesVisible);
    // console.log("Active New Releases:", activeNewReleasesPlaylist);
    // console.log("Show Releases Playlist:", showNewReleasesPlaylist);
    // console.log("Show New Releases Notify:", showNewReleasesNotify);
    // console.log(trackId);
    // console.log("Choose Audio:", chooseAudio);
  }, [
    isNewReleasesVisible,
    activeNewReleasesPlaylist,
    showNewReleasesPlaylist,
    showNewReleasesNotify,
    trackId,
    chooseAudio,
  ]);

  useEffect(() => {
    // console.log("item Name:", itemName);
    // console.log("item Desc:", itemDescription);
  }, [itemName, itemDescription]);

  return (
    <YourPlaylistStates.Provider
      value={{
        playlistItem,
        clickSidebarAdd,
        clickFooterAdd,
        showPlaylist,
        showNotify,
        activePlaylist,
        isVisible,
        setIsVisible,
        setActivePlaylist,
        setShowPlaylist,
        setShowNotify,
        handleAddPlaylistModal,
        handleAddPlaylistModal1,
        handleToggleYourPlaylist,
        handleAddAudioTrack,
        isNewReleasesVisible,
        activeNewReleasesPlaylist,
        showNewReleasesPlaylist,
        showNewReleasesNotify,
        setIsNewReleasesVisible,
        setActiveNewReleasesPlaylist,
        setShowNewReleasesPlaylist,
        setShowNewReleasesNotify,
        handleToggleYourPlaylist1,
        handleDeletePlaylistItem,
        handleEditPlaylistItem,
        itemIndex,
        trackId,
        chooseAudio,
        setChooseAudio,
        showCheckBox,
        audioTrack,
        handleDeleteAudioTrack,
        activeDelete,
        setActiveDelete,
        setAudioTrack,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
      {isAddPlaylistItem && (
        <Modal
          isOpen={isAddPlaylistItem}
          closeModal={closeAddPlaylistItemModal}
        >
          <YourPlaylistAdd
            itemName={itemName}
            itemDescription={itemDescription}
            setItemName={setItemName}
            setItemDescription={setItemDescription}
            handleAddPlaylistItem={handleAddPlaylistItem}
            handleUpdatePlaylistItem={handleUpdatePlaylistItem}
            setIsVisible={setIsVisible}
            setShowPlaylist={setShowPlaylist}
            setActivePlaylist={setActivePlaylist}
            clickFooterAdd={clickFooterAdd}
            setIsNewReleasesVisible={setIsNewReleasesVisible}
            setActiveNewReleasesPlaylist={setActiveNewReleasesPlaylist}
            setShowNewReleasesPlaylist={setShowNewReleasesPlaylist}
            trackId={trackId}
          />
        </Modal>
      )}
    </YourPlaylistStates.Provider>
  );
}

export function useYourPlaylist() {
  return useContext(YourPlaylistStates);
}
