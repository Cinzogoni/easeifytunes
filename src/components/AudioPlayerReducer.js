export const audioInitialState = {
  //SET_VIDEO_PLAYING
  isVideoPlaying: false,
  //SET_TRACK
  currentTrackId: null,
  currentTrack: {},
  trackLink: "",
  trackType: "",
  //SET_TRACK_PLAYING
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  //SET_CHECK_TIME
  listeningTime: 1,
  checkListeningTime: 1,
  //SET_TRACK_ENDED
  isTrackEnded: false,
  //SET_TRACK_LIST
  trackList: [],
  trackIndex: 0,
  //SET_VOLUME
  volume: 1,
  //SET_RANDOM_TRACK
  isRandom: false,
  activeRandomClick: true,
  //SET_LOOP_TRACK
  isLooping: false,
  activeLoopClick: true,
  //SET_SHUFFLE_TRACK
  shuffledTrackList: [],
  //SET_STORED_TRACK
  storedTrackListMap: new Map(),
  activeMemo: false,
};
export const actionTypes = {
  SET_VIDEO_PLAYING: "SET_VIDEO_PLAYING",
  SET_TRACK_PLAYING: "SET_TRACK_PLAYING",
  SET_TRACK: "SET_TRACK",
  SET_PLAYING_TIME: "SET_PLAYING_TIME",
  SET_CHECK_TIME: "SET_CHECK_TIME",
  SET_TRACK_ENDED: "SET_TRACK_PLAYING",
  SET_TRACK_LIST: "SET_TRACK_LIST",
  SET_VOLUME: "SET_VOLUME",
  SET_RANDOM_TRACK: "SET_RANDOM_TRACK",
  SET_LOOP_TRACK: "SET_LOOP_TRACK",
  SET_SHUFFLE_TRACK: "SET_SHUFFLE_TRACK",
  SET_STORED_TRACK: "SET_STORED_TRACK",
};

export const audioReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_VIDEO_PLAYING:
      return {
        ...state,
        isVideoPlaying: action.payload.isVideoPlaying,
      };
    case actionTypes.SET_TRACK_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
      };
    case actionTypes.SET_TRACK:
      return {
        ...state,
        currentTrackId: action.payload.id,
        currentTrack: action.payload.track,
        trackLink: action.payload.trackLink,
        trackType: action.payload.trackType,
      };
    case actionTypes.SET_PLAYING_TIME:
      return {
        ...state,
        currentTime: action.payload.currentTime,
        duration: action.payload.duration,
      };
    case actionTypes.SET_CHECK_TIME:
      return {
        ...state,
        listeningTime: action.payload.listeningTime,
        checkListeningTime: action.payload.checkListeningTime,
      };
    case actionTypes.SET_TRACK_ENDED:
      return {
        ...state,
        trackEnded: action.payload.isTrackEnded,
      };
    case actionTypes.SET_TRACK_LIST:
      return { ...state, trackList: action.payload };
    case actionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    case actionTypes.SET_RANDOM_TRACK:
      return {
        ...state,
        isRandom: action.payload.isRandom,
        activeRandomClick: action.payload.activeRandomClick,
      };
    case actionTypes.SET_LOOP_TRACK:
      return {
        ...state,
        isLooping: action.payload.isLooping,
        activeLoopClick: action.payload.activeLoopClick,
      };
    case actionTypes.SET_SHUFFLE_TRACK:
      return { ...state, shuffledTrackList: action.payload };
    case actionTypes.SET_STORED_TRACK:
      return {
        ...state,
        storedTrackListMap: action.payload.storedTrackListMap,
        activeMemo: action.payload.activeMemo,
      };
    default:
      throw new Error("Invalid action!");
  }
};
