import Track from "~/components/Track";
import YourPlaylistAudiosList from "~/components/YourPlaylistAudiosList";
import YourPlaylistInfo from "~/components/YourPlaylistInfo";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useYourPlaylist } from "~/components/YourPlaylistProvider";
import { useUser } from "~/components/UserProvider";

function YourPlaylistPage() {
  const { userName, yourPlaylistName } = useUser();
  const { currentUser } = useUser();
  const { playlistItem } = useYourPlaylist();

  const navigate = useNavigate();

  const playlistIndex = playlistItem.findIndex(
    (item) =>
      item.userName === userName && item.yourPlaylistName === yourPlaylistName
  );

  const foundPlaylist = playlistItem[playlistIndex];
  const yourPlaylist = foundPlaylist ? foundPlaylist.audioTracks : [];

  const avatars = yourPlaylist.map((f) => f.trackAvatar || []);
  const titles = yourPlaylist.map((f) => f.trackTitle || []);

  const currentUserName = foundPlaylist?.userName;
  const currentItemName = foundPlaylist?.yourPlaylistName;

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    currentUser && (
      <Track
        info={
          <YourPlaylistInfo
            playlistIndex={playlistIndex}
            playlistInfo={foundPlaylist}
            avatars={avatars}
            titles={titles}
            currentUserName={currentUserName}
            currentItemName={currentItemName}
          />
        }
        list={
          <YourPlaylistAudiosList
            audioList={yourPlaylist}
            playlistIndex={playlistIndex}
          />
        }
      />
    )
  );
}

export default YourPlaylistPage;
