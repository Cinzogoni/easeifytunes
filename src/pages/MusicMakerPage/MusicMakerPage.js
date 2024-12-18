import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./MusicMakerPage.module.scss";
const cx = classNames.bind(styles);

import MusicMakerInfo from "~/components/MusicMakerInfo";
import MusicMakerSingles from "~/components/MusicMakerSingles";
import MusicMakerAlbums from "~/components/MusicMakerAlbums";
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
  // console.log("musicMakerInfo:", makerFilter);

  return (
    <div className={cx("wrapper")}>
      <MusicMakerInfo musicMakerInfo={makerFilter} />
      <div className={cx("container")}>
        <MusicMakerAlbums musicAlbums={musicAlbums} />
        <MusicMakerSingles musicSingles={musicSingles} />
      </div>
    </div>
  );
}

export default MusicMakerPage;
