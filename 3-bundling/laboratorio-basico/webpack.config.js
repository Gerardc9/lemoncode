const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "./src"),

  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },

  entry: {
    app: "./index.tsx",
    appStyles: "./assets/css/mystyles.scss",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },

      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  devServer: {
    port: 8080,
    devMiddleware: {
      stats: "errors-only",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      scriptLoading: "blocking",
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "mystyles.css",
    }),
  ],
};
