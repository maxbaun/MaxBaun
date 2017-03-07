const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const isDev = process.env.ENV === 'development';

module.exports = {
	devtool: 'eval',
	entry: [
		'babel-polyfill',
		'whatwg-fetch',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: [
					'babel'
				],
				exclude: /node_modules/,
				include: __dirname
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader?minimize&camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
					'postcss-loader'
				],
				include: __dirname
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loaders: [
					'file-loader?name=fonts/[name].[ext]'
				],
				include: __dirname,
				exclude: /images/
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file-loader?name=images/[name].[ext]'
				],
				include: __dirname,
				exclude: /css/
			}
		],
		noParse: [
			/aws\-sdk/
		]
	},
	postcss: [
		require('stylelint'),
		precss,
		require('postcss-color-function'),
		require('postcss-mixins'),
		require('postcss-utilities'),
		require('postcss-import'),
		require('postcss-simple-vars'),
		require('postcss-nested'),
		require('postcss-nesting'),
		require('postcss-cssnext')
	],
	externals: {
		'cheerio': 'window',
		'react/addons': true,
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true
	},
	plugins: [
		new webpack.ProvidePlugin({
			Promise: 'bluebird'
		}),
		new webpack.DefinePlugin({
			AWS_ACCESSKEYID: JSON.stringify('AKIAJXEU34AMYQVWNYMA'),
			AWS_SECRETACCESSKEY: JSON.stringify('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')
		})
	]
};
