const glob = require('glob');
const path = require('path');

module.exports = app => {
	glob.sync('./routes/**/*.js').forEach(file => {
		if (!file.includes('index.js')) {
			require(path.resolve(file))(app);
		}
	});
};
