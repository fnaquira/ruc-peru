require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const cron = require('./cron');

logger.token('remote-addr', function(req) {
	return (
		req.headers['x-real-ip'] ||
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress
	);
});
app.use(logger(':method :remote-addr :url :status :response-time'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.MONGO_STR, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(async () => {
		//await setup();
		cron();
	});
mongoose.connection.on('error', err => {
	console.error(`MongoDB connection error: ${err}`);
	process.exit(1);
});

if (process.env.NODE_ENV === 'development') {
	app.use('/', function(req, res, next) {
		res.header('Access-Control-Expose-Headers', 'X-Suggested-Filename');
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header(
			'Access-Control-Allow-Headers',
			'Content-Type, Authorization, Content-Length, X-Requested-With'
		);
		next();
	});
	app.options('/*', function(req, res, next) {
		return res.sendStatus(200);
	});
}

require('./routes/api')(app);

app.use((req, res, next) => {
	res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port);
console.log('La magia sucede en el puerto ' + port);
