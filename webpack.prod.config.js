const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(jpg)$/,
        type: "asset/resource",
      },
      {
        test: /\.(png)$/,
        type: "asset/inline",
      },
      /* {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // <3kb = inline, >3kb = resource 
          },
        },
      }, */
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    // new TerserPlugin(), No need to use this plugin for production mode, as it is already added in production mode.
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*", // this path is referred from output.path
        path.join(process.cwd(), "build/**/*"), // to clean additional folders apart from dist.
      ],
    }),
    new HtmlWebpackPlugin({
      title: "Hello world", // variable for hbs file
      template: "src/index.hbs",
      description: "Some description", // variable for hbs file
    }),
  ],
};
