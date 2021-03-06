module.exports = {
	init(app) {
		const staticRoutes = require('./static');

		if (process.env.NODE_ENV === 'test') {
			const mockAuth = require('../../spec/support/mock-auth.js');
			mockAuth.fakeIt(app);
		}

		app.use(staticRoutes);

	},
};
