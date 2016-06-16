module.exports = function(app, express, passport) {

    var router = express.Router();

    var adminLoginObj = require('./../app/controllers/adminlogins/adminlogins.js');
    router.post('/authenticate', passport.authenticate('adminLogin', {session:false}), adminLoginObj.authenticate);
    
    router.post('/auth/facebook', adminLoginObj.facebookLogin);
    router.post('/forgot_password', adminLoginObj.forgotPasswordAdmin);
    router.post('/reset_password', adminLoginObj.resetPasswordAdmin);
    router.post('/auth/twitter', adminLoginObj.twitterLogin);
    router.post('/auth/google', adminLoginObj.googeLogin);
    app.use('/adminlogin', router);

}