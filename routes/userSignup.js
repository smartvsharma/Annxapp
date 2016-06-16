module.exports = function(app, express, passport) {

	var router = express.Router();

	var userObj = require('./../app/controllers/userSignup/userSignup.js');
	// router.post('/signupTraveller',function(req, res){
	// 	return travellerObj.signupTraveller(req, res);
	// });

     router.post('/signupUser',userObj.signupUser);
     console.log("in route");
	 app.use('/userSignup', router);
};