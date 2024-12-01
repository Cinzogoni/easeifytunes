// Quét tất cả các thư mục con
const requireContext = require.context("./", true, /\.(mp3)$/);
const mp3Type = requireContext.keys().reduce((acc, path) => {
  // Lấy tên tệp từ đường dẫn
  const name = path.replace("./", "").replace(".mp3", "");
  acc[name] = requireContext(path);
  return acc;
}, {});

export default mp3Type;
