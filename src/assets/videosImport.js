const videos = {};
const importAll = (requireContext) => {
  requireContext.keys().forEach((key) => {
    const fileName = key.replace("./", "");
    videos[fileName] = requireContext(key);
  });
};

importAll(require.context("../assets/videos", false, /\.(mp4|avi|mov)$/));

export default videos;
