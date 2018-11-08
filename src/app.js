const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const viewsFolder = path.join(__dirname, '..', 'src/views');
const bodyParser = require('body-parser');
const logger = require('morgan');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('express-flash');
// const passportConfig = require('./auth/passport-config');
const favicon = new Buffer(
	'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEefcABHj3AAR59wAEefcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUVFQAXFxcAFxAHEgdo0BoFevgZBXn1AAR59wAXFxcAFxcXBBcXFxIWFhYAFhYWAAAAAAAAAAAAAAAAABUVFQAXFxcAFxcXMhcWFZQLU6AnBXr3iQV59SQFefUAFxcXABcXFxAXFxeUFxcXLxcXFwAWFhYAAAAAABUVFQAXFxcAFxcXLxcXF88XFxeyGAcABwV59okFefW9BXn1IgpcsgAXFxcJFxcXthcXF8sXFxcrFxcXABYWFgAXFxcAFxcXLhcXF80XFxfKFxcXKwCV/wUFefVIBXn18wV59b0FefUjDkeFABcXFy8XFxfOFxcXyRcXFysXFxcAFxcXKhcXF8wXFxfTFxcXKg5IhgAFefVEBXn1xAV59fkFefX/BXn1vgV59SUOR4MAFxcXLhcXF9YXFxfJFxcXJxcXFyQXFxe/FxcX2RcXFzYSMlQABXr3BwV59XgFefX2BXn18AV59XwFefYwEjZdABcXFzcXFxfbFxcXvhcXFyIXFxcAFxcXIxcXF78XFxfWFxcXNxMwUAAFefcGBXn1eAV59fAFefVUCmC8ABcXFzgXFxfXFxcXvxcXFyIXFxcAFxcXABcXFwAXFxcjFxcXwRcXF7kWFhYJDkJ5AAV59QYFefV9BXn2lxIuSw0XFxe7FxcXwRcXFyMXFxcAFhYWAAAAAAAXFxcAFxcXABcXFyYXFxeHFhYWDxYWFgAFefUABXn1CQV6+FcMUZsnFxYViBcXFyYXFxcAFhYWAAAAAAAAAAAAAAAAABYWFgA2NjYAFhYWDBYWFgMVFRUAAAAAAAV59gAEff4FDFOfCRcUEQwWFhYAFxcXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD5/wAA4ccAAODHAADAQwAAgCEAAAgQAAAIEAAAhCEAAMIDAADjBwAA448AAP//AAD//wAA//8AAA==',
	'base64'
);

const routeConfig = require('./routes/routes.config');
routeConfig.init(app);

app.get('/favicon.ico', function(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Length', favicon.length);
	res.setHeader('Content-Type', 'image/x-icon');
	res.setHeader('Cache-Control', 'public, max-age=2592000'); // expiers after a month
	res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
	res.end(favicon);
});
app.set('views', viewsFolder);
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'assets')));
app.use(expressValidator());
app.use(
	session({
		secret: process.env.kryptoSecret,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1.21e9 }, //set cookie to expire in 14 days
	})
);
app.use(flash());
// passportConfig.init(app);
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});
app.use(logger('dev'));

module.exports = app;
