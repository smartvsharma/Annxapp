module.exports = function(app, express, passport) {
	var router = express.Router();

	var userObj = require('./../app/controllers/users/users.js');
	var wishlistObj = require('./../app/controllers/users/wishlist.js');
        var roleObj = require('./../app/controllers/roles/roles.js');
	//var reviewObj = require('./../app/controllers/users/review.js');

		router.post('/authenticate', passport.authenticate('userLogin', {failureRedirect: '/users/loginFailure'}), userObj.authenticate);
		router.get('/userOne/:id',userObj.userOne);
		router.post('/authenticateSocial',userObj.facebookcheck);
		router.get('/list', userObj.list);
		router.post('/add', passport.authenticate('basic', {session:false}), userObj.add);
		//router.param('id', userObj.user);
		router.post('/update/:id', userObj.update);
		router.get('/loginFailure', userObj.failureRedirect);
		router.post('/bulkUpdate', userObj.bulkUpdate);
    	router.post('/signupUser',userObj.signupUser);
		router.post('/forgot_password', userObj.forgot_password);
		router.post('/reset_password', userObj.reset_password);
		router.get('/viewUser',userObj.viewUser);
		//router.post('/edituserprofile/',userObj.edituserprofile);
		router.post('/logOut',userObj.LogOut);
		router.post('/editprofile',userObj.edituserprofile);
		router.post('/search',userObj.search);


        router.post('/userWishlist',wishlistObj.addwishlist);
        router.post('/showWishlist',wishlistObj.showwishlist);
		router.post('/removeWishlist',wishlistObj.removewishlist);

		router.post('/userreview',userObj.addreview);
		router.post('/hostrating',userObj.ratingavg);
        router.post('/addoffer',userObj.addoffer);
        router.post('/offertype',userObj.offertype);
        router.post('/offerviews',userObj.offerviews);
        router.post('/offerlist',userObj.offerlist);
        router.post('/deleteoffer',userObj.deleteoffer);
        router.post('/getuserType',roleObj.roleviews);
	    router.post('/deleteofferdetails',roleObj.deleteoffer);
        router.post('/changePassword',userObj.changePassword);
          
		app.use('/users', router);
        

}
