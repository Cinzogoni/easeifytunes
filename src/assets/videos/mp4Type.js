// Quét tất cả các thư mục con
const requireContext = require.context("./", true, /\.(mp4)$/);
const mp4Type = requireContext.keys().reduce((acc, path) => {
  // Lấy tên tệp từ đường dẫn
  const name = path.replace("./", "").replace(".mp4", "");
  acc[name] = requireContext(path);
  return acc;
}, {});

export default mp4Type;
