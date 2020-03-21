module.exports = data => {
	let result = '';
	if (data.tipo_via)
		if (data.tipo_via !== '' && data.tipo_via !== '-')
			result += data.tipo_via + ' ';
	if (data.nombre_via)
		if (data.nombre_via !== '' && data.nombre_via !== '-')
			result += data.nombre_via + ' ';
	if (data.codigo_zona)
		if (data.codigo_zona !== '' && data.codigo_zona !== '-')
			result += data.codigo_zona + ' ';
	if (data.tipo_zona)
		if (data.tipo_zona !== '' && data.tipo_zona !== '-')
			result += data.tipo_zona + ' ';
	if (data.numero)
		if (data.numero !== '' && data.numero !== '-')
			result += 'NRO ' + data.numero + ' ';
	if (data.interior)
		if (data.interior !== '' && data.interior !== '-')
			result += 'INTERIOR ' + data.interior + ' ';
	if (data.lote)
		if (data.lote !== '' && data.lote !== '-')
			result += 'LOTE ' + data.lote + ' ';
	if (data.departamento)
		if (data.departamento !== '' && data.departamento !== '-')
			result += 'DPTO ' + data.departamento + ' ';
	if (data.manzana)
		if (data.manzana !== '' && data.manzana !== '-')
			result += 'MZA ' + data.manzana + ' ';
	if (data.kilometro)
		if (data.kilometro !== '' && data.kilometro !== '-')
			result += 'KM ' + data.kilometro + ' ';
	//result += '('+data.ubigeo+')';
	return result;
};
