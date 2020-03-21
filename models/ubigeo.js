const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const ubigeoSchema = new Schema({
	_id: {
		type: String,
		required: true
	},
	tipo: {
		type: String,
		uppercase: true,
	},
	departamento: {
		type: String,
		uppercase: true,
	},
	departamento_nombre: {
		type: String,
		uppercase: true,
	},
	provincia: {
		type: String,
		uppercase: true,
	},
	provincia_nombre: {
		type: String,
		uppercase: true,
	},
	distrito: {
		type: String,
		uppercase: true,
	},
	nombre: {
		type: String,
		uppercase: true,
	},
}, {timestamps: true});

const ubigeoModel = mongoose.model('ubigeos', ubigeoSchema);

module.exports = ubigeoModel;