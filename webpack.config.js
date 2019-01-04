 module.exports = {
 	entry: './src/index.js',
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
 		filename: 'bundle.js',
 		path: __dirname + '/public'
 	}
 }