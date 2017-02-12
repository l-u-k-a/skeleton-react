/* lobal require, module,  __dirname, process */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const loaders = require('./webpack.loaders');

const config = {
	srcPath: path.join(__dirname, './src'),
	distPath: path.join(__dirname, './dist'),
	host: process.env.HOST || '127.0.0.1',
	port: process.env.PORT || '4444'
};

module.exports = function(env) {
	const nodeEnv = env && env.prod ? 'production' : 'development';
	const isProd = nodeEnv === 'production';

	const plugins = [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'js/vendor.bundle.js'
		}),

		new HtmlWebpackPlugin({
			template: 'www/template.html',
			filename: 'index.html',
			title: 'App Skeleton'
		}),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(nodeEnv)
			}
		}),

		new webpack.NamedModulesPlugin()
	];

	if(isProd) {
		loaders.push({
			test: /\.scss$/,
			use: ExtractTextWebpackPlugin.extract({
				use: [
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				],
				fallback: 'style-loader'
			})
		});

		plugins.push(
			new WebpackCleanupPlugin(),

			new webpack.LoaderOptionsPlugin({
				minimize: true,
				debug: false
			}),

			new ExtractTextWebpackPlugin({
				filename: 'css/styles.bundle.css',
				allChunks: true
			}),

			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					screw_ie8: true,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true
				},
				output: {
					comments: false
				}
			})
		);
	} else {
		plugins.push(
			new webpack.HotModuleReplacementPlugin()
		);

		loaders.push({
			test: /\.scss$/,
			use: [
				{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader'
				},
				{
					loader: 'sass-loader'
				}
			]
		});
	}

	return {
		devtool: isProd ? 'source-map' : 'eval',
		context: config.srcPath,
		entry: {
			js: './index.jsx',
			vendor: [
				'react',
				'react-dom'
			]
		},
		output: {
			path: config.distPath,
			filename: 'js/app.bundle.js'
		},
		module: {
			rules: loaders
		},
		resolve: {
			extensions: ['.jsx', '.js'],
			modules: [
				path.resolve(__dirname, 'node_modules'),
				config.srcPath
			]
		},

		plugins,

		performance: isProd && {
			maxAssetSize: 100,
			maxEntrypointSize: 300,
			hints: 'warning'
		},

		stats: {
			colors: {
				green: '\u001b[32m'
			}
		},

		devServer: {
			contentBase: './src',
			historyApiFallback: true,
			host: config.host,
			port: config.port,
			compress: isProd,
			inline: !isProd,
			hot: !isProd,
			stats: {
				assets: true,
				children: false,
				chunks: false,
				hash: false,
				modules: false,
				publicPath: false,
				timings: true,
				version: false,
				warnings: true,
				colors: {
					green: '\u001b[32m'
				}
			}
		}
	};
};
