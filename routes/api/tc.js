const rp = require('request-promise');
const $ = require('cheerio');

const URL = 'http://www.sunat.gob.pe/cl-at-ittipcam/tcS01Alias';

module.exports = app => {
	app.get('/api/tc', (req, res) => {
		rp(URL)
			.then(function(html) {
				const $row = $('table', html)
					.eq(1)
					.find('tr')
					.last();
				res.json({
					venta: $row
						.find('td')
						.last()[0]
						.children[0].data.replace('\n', '')
						.trim(),
					compra: $row
						.find('td')
						.eq($row.find('td').length - 2)[0]
						.children[0].data.replace('\n', '')
						.trim()
				});
			})
			.catch(function(err) {
				console.log('Error!', err);
			});
	});
};
