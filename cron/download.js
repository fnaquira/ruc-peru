const fs = require('fs');
const path = require('path');
const request = require('request');
const progress = require('request-progress');

const URL_SERVER = 'http://www2.sunat.gob.pe/padron_reducido_ruc.zip';

module.exports = () => {
	return new Promise((resolve, reject) => {
		progress(request(URL_SERVER))
			.on('progress', function(state) {
				console.log('progress', state.percent);
			})
			.on('error', function(err) {
				reject(err);
			})
			.on('end', function() {
				console.log('Descarga finalizada!');
				resolve();
			})
			.pipe(fs.createWriteStream(path.join(__dirname, '../temp/ruc.zip')));
	});
};
