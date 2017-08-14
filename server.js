import path from 'path';
import webpack from 'webpack';
import Express from 'express';
import webpackMiddleware from 'webpack-dev-middleware';
import config from './webpack.config';
import fs from 'fs';

const app = new Express();
const port = 1900;
const compiler = webpack(config);

if (process.env.ENV === 'development') {
	app.use(webpackMiddleware(compiler, {
		noInfo: true,
		stats: 'errors-only',
		publicPath: config.output.publicPath,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	}));
} else {
	app.use(Express.static('dist'));
}

app.get('/*', (req, res) => {
	const file = (process.env.ENV === 'development') ? 'index.html' : 'dist/index.html';
	res.sendFile(path.join(__dirname, file));
});

app.listen(port, error => {
	/* eslint-disable no-console */
	if (error) {
		console.error(error);
	} else {
		console.info('Local server is running at "http://localhost:' + port + '/"...');
	}
	/* eslint-enable no-console */
});

function readJsonFileSync(filepath, encoding) {
	if (typeof (encoding) === 'undefined') {
		encoding = 'utf8';
	}
	var file = fs.readFileSync(filepath, encoding);
	return JSON.parse(file);
}
