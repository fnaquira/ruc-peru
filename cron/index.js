const cron = require('node-cron');
const shell = require('shelljs');

const download = require('./download');
const extract = require('./extract');
const readFile = require('./readFile');

const COMMAND =
	`iconv -f ISO-8859-1 -t UTF-8 temp/padron_reducido_ruc.txt` +
	` -o temp/padron_reducido_ruc_nuevo.txt`;

module.exports = () => {
	cron.schedule(`0 2 * * *`, async () => {
		await download();
		await extract();
		const retCode = shell.exec(COMMAND).code;
		if (retCode !== 0) {
			shell.exit(1);
			throw new Error('Error: Conversión finalizada');
		} else {
			console.log(new Date(), 'Conversión de archivo finalizada');
		}
		readFile();
	});
	console.log(new Date(), 'Servicio inicializado!');
};
