"use strict";
const webpack = require("webpack");

module.exports = function onCreateWebpackConfig({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  });
};
