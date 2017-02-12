module.exports = [
	{
		test: /\.(jsx|js)$/,
		exclude: /node_modules/,
		use: ['babel-loader']
	},
	{
		test: /\.(jpg|png|ttf|eot|woff|woff2|svg|gif)$/,
		loader: 'file-loader',
		options: {
			name: '[path][name].[ext]'
		}
	}
]