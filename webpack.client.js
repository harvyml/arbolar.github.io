 module.exports = {
 	entry: './src/client.js',
 	module: {
 		rules: [//These are the loaders
 			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
 			{test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },

 			{
		      test: /\.css$/,
		      use: ['style-loader', 'css-loader']
		    }
            
 		]
 	},
 	output: {
 		filename: 'client_bundle.js',
 		path: __dirname + '/public',
 		publicPath: '/public'
 	}
 }