const path = require('path');
const fs = require('fs');
const readLine = require('readline');

const partnerModel = require('../models/partner');

module.exports = () => {
	var lineReader = readLine.createInterface({
		input: fs.createReadStream(
			path.join(__dirname, '../temp/padron_reducido_ruc_nuevo.txt')
		)
	});

	let cont = 0;

	lineReader.on('line', async oldLine => {
		line = oldLine.split('|');
		if (cont !== 0) {
			partnerModel.update(line, cont).then(response => {
				console.log(cont, response);
			});
			cont++;
		}
	});
};
