import { useParams } from "react-router-dom";
import { useTrackInfo } from "~/components/TrackInfoProvider";

import Track from "~/components/Track";
import AlbumInfo from "~/components/AlbumInfo";
import AlbumList from "~/components/AlbumList";
import AlbumPageSocial from "~/components/AlbumPageSocial";

function AlbumPage() {
  const { musicMaker } = useTrackInfo();
  const { albumName, albumPerformer } = useParams();

  const Albums = musicMaker.flatMap(
    (maker) =>
      maker.albums?.map((album) => ({
        albumPerformer: album.albumPerformer,
        albumName: album.albumName,
        albumAvatar: album.albumAvatar,
        makerName: maker.makerName,
        releaseDay: album.releaseDay,
        rate: album.rate,
        tracks: album.tracks.map((track) => ({ ...track })),
      })) || []
  );

  // console.log(Albums);

  const findAlbum = Albums.find(
    (t) => t.albumName === albumName && t.albumPerformer === albumPerformer
  );

  const avatar = findAlbum ? findAlbum.albumAvatar || "" : "";
  const trackList = findAlbum ? findAlbum.tracks || [] : [];

  // Lọc các album còn lại ngoài album hiện tại
  const socialAlbums = Albums.filter(
    (t) => t.albumName !== albumName || t.albumPerformer !== albumPerformer
  );
  return (
    <Track
      info={<AlbumInfo albumInfo={findAlbum} />}
      social={<AlbumPageSocial socialAlbums={socialAlbums} />}
      list={<AlbumList trackList={trackList} avatar={avatar} />}
    />
  );
}

export default AlbumPage;
