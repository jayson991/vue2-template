const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    app: path.resolve(__dirname, '../src/index')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
    chunkFilename: 'scripts/[id].chunk.js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    hot: true,
    open: true,
    port: 8000,
    overlay: true,
    progress: true,
    compress: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.runtime.js',
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'medias/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      formatter: require('eslint-friendly-formatter')
    }),
    new VueLoaderPlugin(),
    new HtmlPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      showErrors: true
    })
  ]
}

module.exports = config
