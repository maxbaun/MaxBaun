const config = require('./webpack.config.js');
const path = require('path');
const fs = require('fs');

config.output.filename = 'bundle.[hash].js';

config.entry.push('./index.html');

config.module.loaders.push({test: /\.html$/, loader: 'file?name=[name].[ext]'});

config.plugins.push(
	function () {
		this.plugin('done', function (stats) {
			let htmlPath = path.join(__dirname, 'dist', 'index.html');
			let template = fs.readFileSync(htmlPath, 'utf8');

			fs.writeFile(htmlPath, template.replace(/\/bundle.js/ig, '/bundle.' + stats.hash + '.js'), () => {});
		});
	}
);

module.exports = config;
