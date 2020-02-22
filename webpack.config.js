const path = require('path')
const webpack = require('webpack')

const minimize = !!process.env.MINIMIZE

let configurations = {
  mode: 'development',
  externals: { Clappr : 'Clappr' },
  entry: path.resolve(__dirname, 'src/context_menu.js'),
  resolve: { extensions: ['.js'] },
  plugins: [new webpack.DefinePlugin({ VERSION: JSON.stringify(require('./package.json').version) })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', { modules: 'commonjs' }]],
            plugins: ['add-module-exports'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, './src/public')],
              }
            }
          }
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.html/,
        loader: 'html-loader?minimize=false',
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'latest/',
    filename: 'clappr-context-menu-plugin.js',
    library: 'ContextMenuPlugin',
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: 'public/',
    host: '0.0.0.0',
  }
}

if (minimize) {
  configurations.mode = 'production'
  configurations.output.filename = 'clappr-context-menu-plugin.min.js'
}

module.exports = configurations
