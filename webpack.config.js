const path = require('path')

module.exports = {
  entry: {
    main: './src/main.ts',
    mipmapWorker: './src/util/mipmapWorker.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
    chunkFilename: '[name].js',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      }
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js', '.glsl' ]
  },
  devServer: {
    https: true,
    host: '0.0.0.0',
    port: 443,
    disableHostCheck: true
  }
}
