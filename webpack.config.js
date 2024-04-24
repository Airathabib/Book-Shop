/* eslint-disable quotes */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileMagerWebpackPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");


module.exports = (env) => {
	return {
		mode: env.mode ?? "development",
		context: path.resolve(__dirname, "src"),
		devtool: 'source-map',
		entry: {
			main: "./js/index.js",
		},
		output: {
			path: path.resolve(__dirname, "dist"),
			assetModuleFilename: '[name][ext]',
			clean: true,
		},
		performance: {
			hints: false,
			maxAssetSize: 512000,
			maxEntrypointSize: 512000,
		},
		devServer: {
			port: 9000,
			compress: true,
			hot: true,
			static: {
				directory: path.join(__dirname, "dist")
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'My Book Shop',
				filename: 'index.html',
				template: "./index.html"
			}),
			new webpack.ProgressPlugin(),

			new FileMagerWebpackPlugin({
				events: {
					onStart: {
						delete: ['dist'],
					}
				}
			}),
			new MiniCssExtractPlugin(),
			new ESLintPlugin({ fix: true }),
		],
		module: {
			rules: [
				// loading js throw babel
				{
					test: /\.js$/i,
					use: 'babel-loader',
					exclude: /node_modules/,
				},
				// loading css files
				{
					test: /\.css$/i,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
					]
				},
				// loading scss files
				{
					test: /\.scss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader"
					]
				},
				// loading fonts
				{
					test: /\.(eot|ttf|woff|woff2)$/,
					type: 'javascript/auto',
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts',
						publicPath: '../fonts'
					},
				},
				//loading images
				{
					test: /\.(png|jpeg|jpg|gif|svg|ico)$/i,
					// type: 'asset/resource'
					type: 'javascript/auto',
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'images',
					},
				}
			]
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						name: "vendors",
						test: /node_modules/,
						chunks: "all",
						enforce: true,
					}
				}
			},
			minimizer: [
				// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
				// `...`,
				"...",
				new CssMinimizerPlugin(),
			],
		},
	};
};
