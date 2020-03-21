const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partnerSchema = new Schema(
	{
		_id: {
			type: String,
			required: true
		},
		nombre: {
			type: String,
			trim: true,
			uppercase: true,
			required: true
		},
		estado: {
			type: String,
			uppercase: true
		},
		condicion: {
			type: String,
			uppercase: true
		},
		ubigeo: {
			type: String,
			uppercase: true
		},
		tipo_via: {
			type: String,
			uppercase: true
		},
		nombre_via: {
			type: String,
			uppercase: true
		},
		codigo_zona: {
			type: String,
			uppercase: true
		},
		tipo_zona: {
			type: String,
			uppercase: true
		},
		numero: {
			type: String,
			uppercase: true
		},
		interior: {
			type: String,
			uppercase: true
		},
		lote: {
			type: String,
			uppercase: true
		},
		departamento: {
			type: String,
			uppercase: true
		},
		manzana: {
			type: String,
			uppercase: true
		},
		kilometro: {
			type: String,
			uppercase: true
		}
	},
	{ timestamps: true }
);

const partnerModel = mongoose.model('empresas', partnerSchema);

module.exports = {
	findById: _id => {
		return new Promise(async (resolve, reject) => {
			try {
				const partner = await partnerModel.findById(_id);
				if (!partner) reject({ message: 'No se encontró coincidencia' });
				resolve(partner);
			} catch (err) {
				console.error('[get mongo]', err);
				reject(err);
			}
		});
	},
	update: (line, cont) => {
		return new Promise((resolve, reject) => {
			const entidad = new partnerModel({
				_id: line[0],
				nombre: line[1],
				estado: line[2],
				condicion: line[3],
				ubigeo: line[4],
				tipo_via: line[5],
				nombre_via: line[6],
				codigo_zona: line[7],
				tipo_zona: line[8],
				numero: line[9],
				interior: line[10],
				lote: line[11],
				departamento: line[12],
				manzana: line[13],
				kilometro: line[14]
			});
			const upsertData = entidad.toObject();
			delete upsertData._id;
			partnerModel.updateOne(
				{ _id: entidad.id },
				upsertData,
				{ upsert: true },
				(err, body) => {
					if (err) reject(err);
					resolve({ newCont: cont, body });
				}
			);
		});
	}
};
