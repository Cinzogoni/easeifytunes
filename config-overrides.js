/* eslint-disable react-hooks/rules-of-hooks */
const { override, useBabelRc } = require("customize-cra");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = override(useBabelRc(), (config) => {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/videos/**/*.{mp4,avi,mov}",
          to: "videos/[name][ext]",
        },
      ],
    })
  );

  return config;
});
