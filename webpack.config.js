var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config  = {
	context: __dirname + '/src',
	entry: {
		app: './app.ts',
		vendor: './vendor.ts'
	},
	output: {
		path: __dirname + "/src",
		filename: "[name].bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts', expect: /node_modules/ },
			{ test: /legacy\.js$/, loader: 'legacy', expect: /node_modules/},
			{ test: /\.js$/, loader: 'babel?presets[]=es2015', expect: /node_modules/ },
			{test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
			{ test: /\.html$/, loader: 'raw', expect: /node_modules/ }
		],
		noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.scss']
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
		new HtmlWebpackPlugin({ template: './index.html', inject: false })
	],
	externals: {
		BMap: 'BMap'
	}
};

if (process.env.NODE_ENV === 'production') {
	config.output.path = __dirname + '/dist';
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
	config.module.loaders.push({ test: /\.scss$/, loader: "style!css!sass", expect: /node_modules/ });
}
else {
	config.output.publicPath = 'http://localhost:8080/';
	config.devtool = 'source-map';
	config.module.loaders.push({ test: /\.scss$/, loader: "style!css?sourceMap!sass?sourceMap", expect: /node_modules/ });
}

module.exports = config;