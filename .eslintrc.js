module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/essential',
		'@vue/standard'
	],
	plugins: [
		'vue'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'indent': ['error', 'tab'],
		'no-tabs': 0,
		'space-before-function-paren': ['error', {
			'anonymous': 'always',
			'named': 'never',
			'asyncArrow': 'always'
		}],
		'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
		'quotes': ['error', 'single'],
		'brace-style': ['error', 'stroustrup', {
			allowSingleLine: true
		}]
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
