import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypescript from "react-refresh-typescript";
import { builBabelLoaders } from "./babel/buildBabelLoaders";


export function buildLoaders (options:BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';
  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules : {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
      }
      
    },
  }

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [ // порядок имеет значение в rules
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      "sass-loader",],
  }

  // const tsLoader =  {
  //   exclude: /node_modules/,
  //   // принимает только ts/tsx
  //   test: /\.tsx?$/,
  //   use: [
  //     {
  //     loader: 'ts-loader',
  //     options: {
  //       transpileOnly: true,
  //       getCustomTransformers: () => ({
  //         before: [isDev && ReactRefreshTypescript()].filter(Boolean)
  //       })
  //     }
  //   }
  //   ],
  // }

  const babelLoader = builBabelLoaders(options);

  const svgLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack', 
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                }
              }
            ]
          }
        }       
      }
    ],
  }
  
  return [
      assetLoader,
      sassLoader,
      //tsLoader,
      babelLoader,
      svgLoader,// для работы с cvg
    
  ]
}