module.exports = function(app, express, passport) {
	var router = express.Router();	
	var cmsObj = require('./../app/controllers/cms/cms.js');
	router.get('/listing',cmsObj.listing);
	router.get('/editPage/:id',cmsObj.editPage);
	router.post('/update/:id',cmsObj.update);
        app.use('/cms', router);
}