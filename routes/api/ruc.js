const Partner = require('../../models/partner');
const Ubigeo = require('../../models/ubigeo');
const concatenarDirec = require('../../lib/partner');

module.exports = app => {
	app.get('/api/ruc/:ruc', async (req, res) => {
		try {
			const partner = await Partner.findById(req.params.ruc);
			if (!partner) {
				return res.status(500).json({
					message: 'No se encontro una coincidencia valida para su busqueda!'
				});
			}
			const direc = concatenarDirec(partner['_doc']);
			let direccion = direc;
			let ubigeo;
			if (partner['_doc'].ubigeo !== '-') {
				ubigeo = await Ubigeo.findById(partner['_doc'].ubigeo);
				direccion =
					direc +
					ubigeo['_doc'].nombre +
					' ' +
					ubigeo['_doc'].provincia_nombre +
					' ' +
					ubigeo['_doc'].departamento_nombre;
			}
			res.json({
				...partner['_doc'],
				direccion
			});
		} catch (err) {
			console.error('[get controller]', err);
			res.status(500).json({
				message: 'No se encontro una coincidencia valida para su busqueda!'
			});
		}
	});
};
