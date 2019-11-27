const manifestJSON = require('./client/public/manifest.json')

module.exports = {
	devServer: {
		contentBase: './client/public'
	},
	pwa: {
		themeColor: manifestJSON.theme_color,
		workboxOptions: {
			skipWaiting: true,
			clientsClaim: true,
			runtimeCaching: []
		}
	},
	outputDir: './client/dist',
	lintOnSave: false,
	pages: {
		index: {
			entry: './client/src/main.js',
			template: './client/public/index.html',
			filename: 'index.html'
		}
	}
}
