const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ruc');
mongoose.connection.on('error', err => {
	console.error(`MongoDB connection error: ${err}`);
	process.exit(1);
});

const ubigeoModel = require('./models/ubigeo');
const ubigeos = require('./data/ubigeo-peru');

/*ubigeos.forEach(item => {
	var row = new ubigeoModel({
		_id: item.departamento + item.provincia + item.distrito,
		nombre: item.nombre,
		departamento: item.departamento,
		provincia: item.provincia,
		distrito: item.distrito
	});
	row.save().then(result => {
		console.log('==>', result['_doc']._id);
	});
});*/

const updateUbigeo = (_id, updateParams) => {
	ubigeoModel
		.update({ _id: _id }, { $set: updateParams })
		.exec()
		.then(result => {
			console.log('==>' + result['_doc']._id);
		})
		.catch(err => {
			console.log(err);
		});
};

ubigeoModel.find({}, {}, function(err, items) {
	if (!err) {
		items.forEach(item => {
			let tipo = 'D';
			let provincia_nombre = '';
			let departamento_nombre = '';
			if (item.distrito === '00') tipo = 'P';
			if (item.provincia === '00') tipo = 'R';
			if (tipo === 'D') {
				ubigeoModel
					.findById(item.departamento + item.provincia + '00')
					.select('nombre')
					.exec()
					.then(doc => {
						provincia_nombre = doc['_doc'].nombre;
						ubigeoModel
							.findById(item.departamento + '0000')
							.select('nombre')
							.exec()
							.then(doc => {
								departamento_nombre = doc['_doc'].nombre;
								const updateParams = {
									tipo: tipo,
									departamento_nombre: departamento_nombre,
									provincia_nombre: provincia_nombre
								};
								updateUbigeo(item._id, updateParams);
							})
							.catch(err => {
								console.log(err);
							});
					})
					.catch(err => {
						console.log(err);
					});
			}
			if (tipo === 'P') {
				ubigeoModel
					.findById(item.departamento + '0000')
					.select('nombre')
					.exec()
					.then(doc => {
						departamento_nombre = doc['_doc'].nombre;
						const updateParams = {
							tipo: tipo,
							departamento_nombre: departamento_nombre,
							provincia_nombre: provincia_nombre
						};
						updateUbigeo(item._id, updateParams);
					})
					.catch(err => {
						console.log(err);
					});
			}
		});
	} else {
		return console.log(err);
	}
});
