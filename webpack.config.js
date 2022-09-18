const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { relative } = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    // splitChunks: {
    //   chunks: 'all',
    // },
  };

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./assets/scripts/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: optimization(),
  devServer: {
    historyApiFallback: true,
    open: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./templates/pages/index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images"),
          to: path.resolve(__dirname, "dist/assets"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         // hmr: isDev,
      //         // reloadAll: true
      //       },
      //     },
      //   'css-loader']
      // },
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        type: "asset/resource",
        // loader: 'file-loader',
        // options: {
        //   name: '[path][name].[ext]',
        // }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        // use: ['file-loader'],
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: '../'
            // }
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
