const path = require("path");

const common = {
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  // other plugins, postcss config etc. common for frontend and backend
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "css-modules-typescript-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
};

const backend = {
  entry: path.join(__dirname, "src", "app.ts"),
  output: { path: path.join(__dirname, "build"), filename: "backend.js" },
  target: "node",
};

module.exports = [Object.assign({}, common, backend)];
