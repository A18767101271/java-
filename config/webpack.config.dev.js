'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('../scripts/utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('../scripts/utils/ModuleScopePlugin');

const getClientEnvironment = require('./env');

const paths = require('./paths');


const publicPath = '/';

const publicUrl = '';

const env = getClientEnvironment(publicUrl);


module.exports = {

  devtool: 'cheap-module-source-map',

  entry: {

    settled: [

     // require.resolve('./polyfills'),

      require.resolve('../scripts/utils/webpackHotDevClient'),

      './src/apps/settled/index.tsx'

    ],
    marketing: [

     // require.resolve('./polyfills'),

      require.resolve('../scripts/utils/webpackHotDevClient'),

      './src/apps/marketing/index.tsx'

    ],
    dashboard: [

     // require.resolve('./polyfills'),

      require.resolve('../scripts/utils/webpackHotDevClient'),

      './src/apps/dashboard/index.tsx'

    ],

  }



  ,
  output: {

    path: paths.appBuild,

    pathinfo: true,

    filename: '[name]/js/[name].js',

    chunkFilename: '[name]/js/[name].chunk.js',

    publicPath: publicPath,

    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {

    modules: ['node_modules', paths.appNodeModules].concat(

      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),

    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {},
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [{

      oneOf: [

        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.(ts|tsx)$/,
          include: paths.appSrc,


          use: [{
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['react'],
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader'
          }
          ]


        },
        {
          test: /\.(js)$/,
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {

            cacheDirectory: true,
          },
        },


        {
          test: /\.(scss|css)$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {

                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9'
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            require.resolve('sass-loader')
          ],
        },

        {

          exclude: [/\.js$/, /\.html$/, /\.json$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },

    ],
  },
  plugins: [



    new HtmlWebpackPlugin({
      filename: 'settled/index.html',
      inject: true,
      template: './src/apps/settled/index.html',
      chunks: ['settled']
    }),
    new HtmlWebpackPlugin({
      filename: 'marketing/index.html',
      inject: true,
      template: './src/apps/marketing/index.html',
      chunks: ['marketing']
    }),
    new HtmlWebpackPlugin({
      filename: 'dashboard/index.html',
      inject: true,
      template: './src/apps/dashboard/index.html',
      chunks: ['dashboard']
    }),

    new webpack.NamedModulesPlugin(),

    new webpack.DefinePlugin(env.stringified),

    new webpack.HotModuleReplacementPlugin(),


    new WatchMissingNodeModulesPlugin(paths.appNodeModules),

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },

  performance: {
    hints: false,
  },
};