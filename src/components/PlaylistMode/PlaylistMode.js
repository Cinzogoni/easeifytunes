import { useTrackInfo } from "~/components/TrackInfoProvider";
import { useUser } from "../UserProvider";
import { useYourPlaylist } from "../YourPlaylistProvider";

import Track from "../Track";
import PlaylistModeInfo from "../PlaylistModeInfo";
import PlaylistModeWrapList from "../PlaylistModeWrapList";

function PlaylistMode() {
  const { albumName, albumPerformer, topic } = useTrackInfo();
  const { userName, yourPlaylistName } = useUser();
  const { playlistItem } = useYourPlaylist();

  const trackInfo = {
    albumName,
    albumPerformer,
    topic,
    userName,
    yourPlaylistName,
  };

  const findPlaylistItem = playlistItem.find(
    (item) =>
      item.userName === userName && item.yourPlaylistName === yourPlaylistName
  );

  const audioTracks = findPlaylistItem
    ? findPlaylistItem.audioTracks || []
    : [];

  const defaultTitle =
    albumName ?? topic ?? findPlaylistItem?.yourPlaylistName ?? null;

  // console.log("playlistItem:", playlistItem);
  // console.log("findPlaylistItem:", findPlaylistItem);
  // console.log(audioTracks);

  return (
    <Track
      info={<PlaylistModeInfo {...trackInfo} defaultTitle={defaultTitle} />}
      list={
        <PlaylistModeWrapList
          {...trackInfo}
          audioTracks={audioTracks}
          findPlaylistItem={findPlaylistItem}
          yourPlaylistName={yourPlaylistName}
        />
      }
      PlaylistMode
      wrapperPlaylistMode
      framePlaylistMode
      boxPlaylistMode
    />
  );
}

export default PlaylistMode;
