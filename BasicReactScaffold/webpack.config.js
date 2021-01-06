const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssNormalize = require("postcss-normalize");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = ({ env }) => {
  const isEnvDevelopment = env === "development";
  const isEnvProduction = env === "production";

  const styleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve("style-loader"),
      isEnvProduction && MiniCssExtractPlugin.loader,
      {
        loader: require.resolve("css-loader"),
        options: cssOptions,
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          postcssOptions: {
            plugins: [
              require("postcss-preset-env")({
                stage: 3,
              }),
              postcssNormalize(),
            ],
          },
          sourceMap: isEnvProduction,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      });
    }
    return loaders;
  };

  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    entry: path.resolve(__dirname, "./src/index.js"),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: styleLoaders({
            importLoaders: 1,
            sourceMap: isEnvProduction,
          }),
          sideEffects: true,
        },
        {
          test: /\.(scss|sass)$/,
          exclude: /\.module\.(scss|sass)$/,
          use: styleLoaders(
            {
              importLoaders: 3,
              sourceMap: isEnvProduction,
            },
            "sass-loader"
          ),
          sideEffects: true,
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".css", ".scss"],
    },
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            template: path.resolve(__dirname, "./public/index.html"),
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash:8].css",
          chunkFilename: "css/[name].[contenthash:8].chunk.css",
        }),
    ].filter(Boolean),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isEnvProduction
        ? "js/[name].[contenthash:8].js"
        : "js/bundle.js",
      chunkFilename: isEnvProduction
        ? "js/[name].[contenthash:8].chunk.js"
        : "js/[name].chunk.js",
    },
    devtool: isEnvProduction
      ? "source-map"
      : isEnvDevelopment && "inline-source-map",
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            keep_fnames: true,
            keep_classnames: true,
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              comparisons: false,
              inline: 2,
            },
          },
        }),
      ],
    },
  };
};
