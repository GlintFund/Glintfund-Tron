const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const asset_entry = path.join("public", "index.html");

module.exports = {
  entry: ["./src/index.tsx"], // Entry point of your application
  output: {
    filename: "bundle.js", // Output bundle file name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Resolve these extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, asset_entry),
      cache: false,
    }),
  ],

  devServer: {
    watchFiles: [path.resolve(__dirname, "src")],
    // contentBase: path.join(__dirname, "public"), // Serve files from this directory
    port: 3000, // Port for the development server
    liveReload: true,
    // hot: true,
    // open: true, // Open the default web browser when the server starts
  },
};
