import { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import webpack from "webpack";
import path from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins(options:BuildOptions): Configuration['plugins'] {

  const isDev = options.mode === 'development';
  const isProd = options.mode === 'production';

  const plugins:Configuration['plugins'] = [
    // cсылка до index.html нашего bundle
    // favicon:path.resolve( options.paths.public,'favicon.ico')
    new HtmlWebpackPlugin({template: options.paths.html}),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(options.platform),
      __ENV__: JSON.stringify(options.mode)
    }),

  ]

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin())
    /** выносим проверку типов в отдельный процесс, тем самым не нагружая сборку */
    plugins.push(new ForkTsCheckerWebpackPlugin())
    plugins.push(new ReactRefreshWebpackPlugin())
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }))
    plugins.push(new BundleAnalyzerPlugin())
    plugins.push(new CopyPlugin({
      patterns: [
        {from: path.resolve(options.paths.public, 'locales'), to: path.resolve(options.paths.output, 'locales')},
      ]
    }))
  }

  return plugins
}

