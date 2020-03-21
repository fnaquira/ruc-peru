const rp = require('request-promise');
const $ = require('cheerio');

const URL =
	'https://www.sbs.gob.pe/app/spp/empleadores/comisiones_spp/Paginas/comision_prima.aspx';

module.exports = app => {
	app.get('/api/afp', (req, res) => {
		rp(URL)
			.then(function(html) {
				const $afps = $('.JER_filaContenido', html);
				const afps = [];
				for (var i = 0; i < $('.JER_filaContenido', html).length; i++) {
					let afp_name = $afps[i].children[1].children[0].data
						.replace('\n', '')
						.trim();
					let afp_flujo = $afps[i].children[5].children[0].data
						.replace('\n', '')
						.replace('%', '')
						.trim();
					let afp_mixta_flujo = $afps[i].children[7].children[0].data
						.replace('\n', '')
						.replace('%', '')
						.trim();
					let afp_mixta_anual = $afps[i].children[9].children[0].data
						.replace('\n', '')
						.replace('%', '')
						.trim();
					let afp_prima = $afps[i].children[11].children[0].data
						.replace('\n', '')
						.replace('%', '')
						.trim();
					let afp_aporte = $afps[i].children[13].children[0].data
						.replace('\n', '')
						.replace('%', '')
						.trim();
					let afp_remuneracion = $afps[i].children[15].children[0].data
						.replace('\n', '')
						.replace(',', '')
						.replace('%', '')
						.trim();
					afps.push({
						name: afp_name,
						flujo: afp_flujo,
						mixta_flujo: afp_mixta_flujo,
						mixta_anual: afp_mixta_anual,
						prima: afp_prima,
						aporte: afp_aporte,
						remuneracion: afp_remuneracion
					});
				}
				res.json(afps);
			})
			.catch(err => {
				res.status(500).json({ message: 'Hubo un error al obtener las AFPs!' });
				throw err;
			});
	});
};
