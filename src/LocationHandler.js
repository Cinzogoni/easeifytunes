import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useTrackInfo } from "./components/TrackInfoProvider";
import { useUser } from "./components/UserProvider";

function LocationHandler() {
  const {
    setAlbumName,
    setAlbumPerformer,
    setTopic,
    setStageName,
    setTrackTitle,
  } = useTrackInfo();
  const { setUserName, setYourPlaylistName } = useUser();

  const location = useLocation();

  useEffect(() => {
    const trackMatch = location.pathname.match(
      /^\/track\/(?<stageName>[^/]+)\/(?<trackTitle>[^/]+)$/
    );
    if (trackMatch) {
      const [, stageName, trackTitle] = trackMatch;
      setStageName(decodeURIComponent(stageName));
      setTrackTitle(decodeURIComponent(trackTitle));
      setAlbumName(null);
      setAlbumPerformer(null);
      setTopic(null);
      setUserName(null);
      setYourPlaylistName(null);
    }

    const albumMatch = location.pathname.match(
      /^\/albumPage\/(?<albumPerformer>[^/]+)\/(?<albumName>[^/]+)$/
    );
    if (albumMatch) {
      const [, albumPerformer, albumName] = albumMatch;
      setAlbumName(decodeURIComponent(albumName));
      setAlbumPerformer(decodeURIComponent(albumPerformer));
      setTopic(null);
      setUserName(null);
      setYourPlaylistName(null);
    }

    const podcastMatch = location.pathname.match(/^\/podcastPage\/([^/]+)$/);
    if (podcastMatch) {
      const [, topic] = podcastMatch;
      setTopic(decodeURIComponent(topic));
      setAlbumName(null);
      setAlbumPerformer(null);
      setUserName(null);
      setYourPlaylistName(null);
    }

    const yourPlaylistMatch = location.pathname.match(
      /^\/yourPlaylistPage\/(?<userName>[^/]+)\/(?<yourPlaylistName>[^/]+)$/
    );
    if (yourPlaylistMatch) {
      const [, userName, yourPlaylistName] = yourPlaylistMatch;
      setUserName(decodeURIComponent(userName));
      setYourPlaylistName(decodeURIComponent(yourPlaylistName));
      setTopic(null);
      setAlbumName(null);
      setAlbumPerformer(null);
    }
  }, [
    location.pathname,
    setStageName,
    setTrackTitle,
    setAlbumName,
    setAlbumPerformer,
    setTopic,
    setUserName,
    setYourPlaylistName,
  ]);
  return null;
}

export default LocationHandler;
