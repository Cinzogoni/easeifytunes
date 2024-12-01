import { useParams } from "react-router-dom";

import Track from "~/components/Track";
import MusicMakerInfo from "~/components/MusicMakerInfo";
import MusicMakerList from "~/components/MusicMakerList";

import { useTrackInfo } from "~/components/TrackInfoProvider";

function MusicMakerPage() {
  const { musicMaker } = useTrackInfo();
  const { stageName } = useParams();

  const makerFilter = musicMaker.filter(
    (check) => check.makerName === stageName
  );

  const musicSingles = makerFilter.flatMap((track) => track.singles);

  const musicAlbums = makerFilter.flatMap(
    (maker) =>
      maker.albums?.map((album) => ({
        albumPerformer: album.albumPerformer,
        albumName: album.albumName,
        albumAvatar: album.albumAvatar,
        tracks:
          album.tracks?.map((track) => ({
            ...track,
            albumPerformer: album.albumPerformer,
            albumName: album.albumName,
            albumAvatar: album.albumAvatar,
          })) || [],
      })) || []
  );

  // console.log("isTracks:", isTracks);
  // console.log("musicSingles:", musicSingles);
  // console.log("musicAlbums:", musicAlbums);
  // console.log("musicMakerInfo:", musicMakerInfo);

  return (
    <Track
      info={<MusicMakerInfo musicMakerInfo={makerFilter} />}
      list={
        <MusicMakerList musicSingles={musicSingles} musicAlbums={musicAlbums} />
      }
    />
  );
}

export default MusicMakerPage;
