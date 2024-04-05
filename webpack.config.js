/**
 * webpack has different placeholder values:-
 * [name]
 * [hash]
 * [chunkhash]
 * [id]
 * [query]
 * [contenthash]
 */

/**
 * contenthash is used for automatic deletion older browser cache and
 * replace with newer bundled files with a new different hash.
 * When files change bubdled files ka hash also change.
 *
 *  Ex: js/[name].[contenthash].js
 */

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
// const webpack = require('webpack');
module.exports = {
  entry: {
    // you can have scss files imports only in one of the following files
    // selectors: './src/selectors.js',
    index: ["./src/index.js"],
    about: ["./src/about.js"],
  },
  mode: "development",
  output: {
    // placing all js files inside a js folder makes it easy process
    filename: "js/[name].bundle.js",
    path: __dirname + "/dist",
    clean: true,

    // webpack dev server places all files in publicRoot url(localhost:9000) + assets folder
    // like localhost:9000/assets, serve all files via localhost:9000/assets only.
    // publicPath: '/assets',

    // this option is used to determine the naming pattern
    // chunk imports created during the code-splitting process
    chunkFilename: "chunksFiles/[name].chunk.js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.scss$/i,
        // MiniCssExtractPlugin.loader will extract css into to seperate files for ease
        // 'css-loader is responsible for resolving @import and url() statements within the CSS files.
        // 'postcss-loader is used after css-loader to apply PostCSS transformations, such as Autoprefixer.
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        // use: [
        //   { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
        //   'css-loader',
        //   'sass-loader',
        // ],
        // use: ['style-loader', 'css-loader', 'sass-loader'],
        // use: [
        //   {
        //     loader: ExtractCssChunks.loader,
        //     options: {
        //       publicPath: '/dist',
        //     },
        //   },
        //   'css-loader',
        //   'sass-loader',
        // ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        // javascript can not live without babel-loader
        // here we only mention loader, remaining config is available in .babelrc
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    // connecting bundled files will be done here
    new HtmlWebpackPlugin({
      title: "Home Page",
      filename: "index.html",
      template: "public/index.html", // takes the reference of these files and just adds the bundled files.
      chunks: ["index"],
    }),

    new HtmlWebpackPlugin({
      title: "About Page",
      filename: "about.html",
      template: "public/about.html", // takes the reference of these files and just adds the bundled files.
      chunks: ["about"],
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].[id].css",
    }),

    // new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    // static: './dist',
    // static: ['contentbase-files'],

    // to serve NON-bundled files like images/css/html files
    // (check Ben10 file), target this folder.
    static: {
      directory: __dirname + "/contentbase-files",
    },

    port: 9000,
    hot: "only",
    // devMiddleware: {
    //   publicPath: '/assets',
    // },
  },

  // optimization: {
  //   runtimeChunk: 'single',
  // },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
