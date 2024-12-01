import { useTrackInfo } from "~/components/TrackInfoProvider";

import PlaylistModeList from "../PlaylistModeList";

function PlaylistModeWrapList({
  albumName,
  albumPerformer,
  topic,
  audioTracks,
  findPlaylistItem,
  yourPlaylistName,
}) {
  const { musicMaker, podcast } = useTrackInfo();

  const allAudio = [...podcast, ...musicMaker.flatMap((album) => album.albums)];

  const findAudios = allAudio.find(
    (t) =>
      (t.albumName === albumName && t.albumPerformer === albumPerformer) ||
      t.topic === topic
  );

  const trackList = findAudios
    ? findAudios.tracks || findAudios.audios || []
    : [];

  const combinedTrackList = [...trackList, ...audioTracks];

  return (
    <PlaylistModeList
      trackList={combinedTrackList}
      findPlaylistItem={findPlaylistItem}
      yourPlaylistName={yourPlaylistName}
    />
  );
}

export default PlaylistModeWrapList;
