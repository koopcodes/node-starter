module.exports = {
	index(req, res, next) {
		res.render('static/home', {
      title: 'Welcome to projectName!'
    });
	},

  marco(req, res, next) {
    res.render('static/marco', { body: 'polo' });
  },

  about(req, res, next) {
    res.render('static/partials/about', { h1: 'About Us' });
  },

};