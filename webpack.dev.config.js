var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        home: [
            'babel-polyfill',
            './example/index.js'
        ],
        common: ['babel-polyfill']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        chunkFilename: '[id].build.js?[chunkhash]',
        publicPath: '/build',
    },
    module: {
        rules: [
            {         
              test:/\.(js|jsx)?$/,
              loader:'babel-loader',
              exclude:/node_modules/,
              options:{presets:['env']}
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.styl', '.html', '.json'],
        modules: ['node_modules']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].[contenthash:20].css'),
        new webpack.optimize.CommonsChunkPlugin({name:'common', filename:'common.js'}),
        new HtmlWebpackPlugin({
              title: "Agile",
              template: path.join(path.resolve(__dirname),'/build/myApp.html'),  //模板文件
              inject:'body',
              hash:true,    //为静态资源生成hash值
              minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
              }
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port:8000
    }
};
