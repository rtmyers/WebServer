import webpack from 'webpack';
import path from 'path';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import nodeExternals from "webpack-node-externals";

module.exports = {
    devtool: 'inline-source-map',
    entry: [
      path.join(__dirname, "./../../server.js")
    ],
    target: "node",
    externals: nodeExternals(),
    mode: "development",
    module: {
      rules: [
        {
          include: [
            path.join(__dirname, './../../server/')
          ],
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/react",
              "@babel/env",
              "@babel/react-hmre",
              { modules: false }
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        },
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
    output: {
      path: path.resolve(__dirname, 'server'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: path.join(__dirname, "public/"),
      port: 5000,
      publicPath: "http://localhost:5000/api",
      watchContentBase: true,
      progress: true,
      compress: true,
      hot: true,
      historyApiFallback: true
    }
}

//new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify(env.NODE_ENV) } }), new webpack.NamedModulesPlugin() ]
