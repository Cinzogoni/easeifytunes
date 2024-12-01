import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import { useLocation } from "react-router-dom";

import apiMusicMaker from "~/Api/API";
import apiPodcast from "~/Api/API_01";
import apiMoment from "~/Api/API_02";

const TrackProvider = createContext();

export function TrackInfoProvider({ children }) {
  const [musicMaker, setMusicMaker] = useState([]);

  const [stageName, setStageName] = useState(null);
  const [trackTitle, setTrackTitle] = useState(null);

  const [albumName, setAlbumName] = useState(null);
  const [albumPerformer, setAlbumPerformer] = useState(null);

  const [podcast, setPodcast] = useState([]);
  const [topic, setTopic] = useState(null);

  const [moment, setMoment] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [musicMakerData, podcastData, momentData] = await Promise.all([
        apiMusicMaker.getMusicMaker(),
        apiPodcast.getPodcast(),
        apiMoment.getMoment(),
      ]);

      setMusicMaker(musicMakerData);
      setPodcast(podcastData);
      setMoment(momentData);
    } catch (error) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = useMemo(
    () => ({
      musicMaker,
      stageName,
      setStageName,
      trackTitle,
      setTrackTitle,
      albumName,
      setAlbumName,
      albumPerformer,
      setAlbumPerformer,
      podcast,
      topic,
      setTopic,
      moment,
      error,
      setMusicMaker,
      setPodcast,
    }),
    [
      musicMaker,
      podcast,
      moment,
      stageName,
      trackTitle,
      albumName,
      albumPerformer,
      topic,
      error,
    ]
  );

  if (loading) {
    return <h1 style={{ color: "var(--main--text-color)" }}>Loading...</h1>;
  }

  return (
    <TrackProvider.Provider value={value}>{children}</TrackProvider.Provider>
  );
}

export function useTrackInfo() {
  return useContext(TrackProvider);
}
