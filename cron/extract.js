const path = require('path');
const extract = require('extract-zip');

module.exports = () => {
	return new Promise((resolve, reject) => {
		extract(
			path.join(__dirname, '../temp/ruc.zip'),
			{ dir: path.join(__dirname, '../temp') },
			err => {
				if (err) return reject(err);
				console.log('Se extrajo el archivo con éxito!');
				resolve();
			}
		);
	});
};
