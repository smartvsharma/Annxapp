var userObj = require('./../../models/users/users.js');
var mongoose = require('mongoose');
var constantObj = require('./../../../constants.js');
var nodemailer = require('nodemailer');
var md5=require('md5');

exports.failureRedirect = function(req,res){
    res.jsonp({'status':'faliure', 'messageId':401, 'message':'Either username or password is not valid!'});
}
  //authenticate
              exports.authenticate = function(req, res) {
                      res.jsonp({'status':'success', 'messageId':200, 'message':'User logged in successfully',"userdata":req.user});
              }
		

            

exports.signupUser = function(req,res) 
{
	var userDetails = (req.body);

  userDetails['password'] = md5(req.body.password);

	userObj.addUser(userDetails, function(err, data){
				var messages = '';
				var errMessage = '';
				var status = '';
				if (err) {
					console.log(err);
					for (var errName in err.errors) {
						errMessage += err.errors[errName].message + "\n";
					}
					messages += errMessage;
					status = '201';
					if(err.code == '11000'){
						messages += ' Email Already Exist';
					}
					var response = {"status":'faliure',"messageId":"401","message":messages};
	               				 res.status(401).json(response);
				}
				else{
					var transporter = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "osgroup.sdei@gmail.com",
        pass: "mohali2378"
    }
});
	             	var mailOptions = {
	              		from: 'osgroup.sdei@gmail.com',
	              		to: req.body.email,
	              		subject: 'Reset Password',
	              		text: '<p>User Registered success fully.</p>'
	                };
	         		transporter.sendMail(mailOptions, function(error, response){
	              		if(error){
	                  			console.log(error);
	             		 }
	             		else{
							 var response = {"status":'success',"messageId":"200","message":"user add successfully!"};
	               				 res.status(200).json(response);
	              		 //return res.status(200).send(response)
	           			}
	          		});
	            }
	})
}

exports.editProfile = function(req,res){ console.log("in edit ");
	var details={};
    if(req.body.firstname){details.firstname= req.body.firstname;}
    if(req.body.lastname){details.lastname= req.body.lastname;}
	if(req.body.phone){details.phone= req.body.phone;}
	if(req.body.dob){details.dob= req.body.dob;}
	if(req.body.age){details.age= req.body.age;}
	if(req.body.address){details.address= req.body.address;}
	if(req.body.city){details.city= req.body.city;}
	if(req.body.state){details.state= req.body.state;}
	if(req.body.zip_code){details.zip_code= req.body.zip_code;}
	if(req.body.user_type){details.user_type= req.body.user_type;}
	
	if (!req.session.user._id) {
				var response = {"status":'faliure',"messageId":"401","message":"You need to log in first!"};
	               				 res.status(401).json(response);	
					
				}
	else{
		userObj.editprofile(req.session.user._id,details, function(err, data){ console.log("bgjfhgjf** "+JSON.stringify(data));
			var messages = '';
			var errMessage = '';
			var status = '';
			if (err) {
				console.log(err);
				for (var errName in err.errors) {
					errMessage += err.errors[errName].message + "\n";
				}
				messages += errMessage;
				status = '201';
				if(err.code == '11000'){
					messages += 'User not Updated';
				}
					var response = {"status":'faliure',"messageId":"401","message":messages};
	               				 res.status(401).json(response);
			}
			else{
				var data= details;
				var response = {"status":'success',"messageId":"200","message":"user Update successfully!","data":data};
	               				 res.status(200).json(response)
			}
		})
	}
}





 exports.forgot_password = function(req, res) {
            //console.log("dataForgot.......",req);
			var details=req.body.email;
				var resetUrl = "http://"+ req.headers.host +"/users/reset_password";
				
                userObj.forgot_password(details, function(err, data) {console.log("*Hello All:",data);
				if(data == null){
					var response = {"status":'faliure',"messageId":"401","message":"no email id exit"};
	               				 res.status(401).json(response);
				}
				
				else{
					var transporter = nodemailer.createTransport("SMTP",{
					  service: "Gmail",
						auth: {
						 user: "osgroup.sdei@gmail.com",
						 pass: "mohali2378"
					}
				});
	             	var mailOptions = {
	              		from: 'osgroup.sdei@gmail.com',
	              		to: req.body.email,
	              		subject: 'User Registered!',
						text: "AnnxApp Service,Follow this link to get reset your passsword::" + resetUrl 
	                };
	         		transporter.sendMail(mailOptions, function(error, response){
	              		if(error){
	                  			console.log(error);
	             		 }
	             		else{
							 var response = {"status":'success',"messageId":"200","message":"link send  successfully!"};
	               				 res.status(200).json(response);
	              		 //return res.status(200).send(response)
	           			}
	          		});
	            }
				
				})
			   
	}


exports.reset_password = function(req,res){

if(req.body.password === req.body.confirm_password){ 
	var details={};
	details.email= req.body.email;
	details.password=req.body.password;
	details['password'] = md5(req.body.password);
	userObj.reset_pass(details,function(err, data){console.log(details);
				var messages = '';
				var errMessage = '';
				var status = '';
				if (err) {
					console.log(err);
					for (var errName in err.errors) {
						errMessage += err.errors[errName].message + "\n";
					}
					messages += errMessage;
					status = '201';
					if(err.code == '11000'){
						messages += ' password no reset successfully';
					}
					var response = {"status":'faliure',"messageId":"401","message":messages};
	               				 res.status(401).json(response);
				}
				else{
					var response = {"status":'success',"messageId":"200","message":"password reset successfully!"};
	               	res.status(200).json(response);
			}
	})
}
else{
	
	var response = {"status":'faliure',"messageId":"401","message":"password and confirm password not matched"};
	               res.status(401).json(response);
}
}

exports.viewUser= function(req,res){ console.log("session"+req.session.user);
	 if (!req.session.user) {
				var response = {"status":'faliure',"messageId":"401","message":"You need to log in first!"};
	               				 res.status(401).json(response);	
					
				}
				else{ console.log("in view");
					var response = {"status":'success',"messageId":"200","message":"User data successfully get!","data":req.session.user};
	               	res.status(200).json(response);
			}
}
	
exports.LogOut= function(req,res){
	 if (!req.session.user) {
				var response = {"status":'faliure',"messageId":"401","message":"User alreay LogOut!"};
	               				 res.status(401).json(response);	
					
				}
				else{
					req.session.user= null;
					var response = {"status":'success',"messageId":"200","message":"User LogOut successfully!"};
	               	res.status(200).json(response);
			}
} 

	
exports.search = function(req,res){
	var details= req.body;
	userObj.search(details,function(err,data){
		var messages = '';
				var errMessage = '';
				var status = '';
				if (err) {
					console.log(err);
					for (var errName in err.errors) {
						errMessage += err.errors[errName].message + "\n";
					}
					messages += errMessage;
					status = '201';
					if(err.code == '11000'){
						messages += ' password no reset successfully';
					}
					var response = {"status":'faliure',"messageId":"401","message":messages};
	               				 res.status(401).json(response);
				}
				else{
					var response = {"status":'success',"messageId":"200","message":"search host successfully!","data":data};
	               	res.status(200).json(response);
			}
		
		})
}



/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
// function createJWT(user) {
//   var payload = {
//     sub: user._id,
//     iat: moment().unix(),
//     exp: moment().add(14, 'days').unix()
//   };
//   return jwt.encode(payload, constantObj.facebookCredentials.token_secret);
// }
/**
		 * Find role by id
		 * Input: roleId
		 * Output: Role json object
		 * This function gets called automatically whenever we have a roleId parameter in route. 
		 * It uses load function which has been define in role model after that passes control to next calling function.
		 */
		 exports.user = function(req, res, next, id) {
		 	userObj.load(id, function(err, user) {
		 		if (err){
		 			res.jsonp(err);
		 		}
		 		else if (!user){
		 			res.jsonp({err:'Failed to load role ' + id});
		 		}
		 		else{
		 			
		 			req.userData = user;
		 			//console.log(req.user);
		 			next();
		 		}
		 	});
		 };
/*
		 * Show user by id
		 * Input: User json object
		 * Output: Role json object
		 * This function gets role json object from exports.role 
		 */
		 exports.findOne = function(req, res) {
		 	if(!req.userData) {
		 		outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
		 	}
		 	else {
		 		outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 
		 		'data': req.userData}
		 	}
		 	res.jsonp(outputJSON);
		 };


		 /**
		 * List all user object
		 * Input: 
		 * Output: User json object
		 */
                        exports.list = function(req, res) {
		 	var outputJSON = "";
		 	userObj.search({}, function(err, data) {
		 		if(err) {
		 			outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
		 		}
		 		else {
		 			outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 
		 			'data': data}
		 		}
		 		res.jsonp(outputJSON);
		 	});
		 }


		/**
		 * Create new user object
		 * Input: User object
		 * Output: User json object with success
		 */
		exports.add = function(req, res) {
		var errorMessage = "";
		var outputJSON = "";
		var userModelObj = {};

		console.log(req.body);
		userModelObj = req.body;
		userObj(userModelObj).save(req.body, function(err, data) { 
			if(err) {
				switch(err.name) {
					case 'ValidationError':
					
						for(field in err.errors) {
							if(errorMessage == "") {
								errorMessage = err.errors[field].message;
							}
							else {							
								errorMessage+=", " + err.errors[field].message;
							}
						}//for
					break;
				}//switch
				
				outputJSON = {'status': 'failure', 'messageId':401, 'message':errorMessage};
			}//if
			else {
				outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.userSuccess, 'data': data};
			}

			res.jsonp(outputJSON);

		});

	}


		 /**
		 * Update user object
		 * Input: User object
		 * Output: User json object with success
		 */
		 exports.update = function(req, res) {
		 	console.log('update_user')
		 	var errorMessage = "";
		 	var outputJSON = "";
		 	var user = req.userData;
		 	user.first_name = req.body.first_name;
			user.last_name = req.body.last_name;
			user.email = req.body.email;
			user.user_name = req.body.user_name;
			user.display_name = req.body.display_name;
		 	user.role = req.body.role;
		 	user.enable = req.body.enable;
		 	user.save(function(err, data) {
		 		console.log(err);
		 		console.log(data);
		 		if(err) {
		 			switch(err.name) {
		 				case 'ValidationError':
		 				for(field in err.errors) {
		 					if(errorMessage == "") {
		 						errorMessage = err.errors[field].message;
		 					}
		 					else {							
		 						errorMessage+="\r\n" + err.errors[field].message;
		 					}
									}//for
									break;
							}//switch
							outputJSON = {'status': 'failure', 'messageId':401, 'message':errorMessage};
						}//if
						else {
							outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.userStatusUpdateSuccess};
						}
						res.jsonp(outputJSON);
					});
		 }


		 /**
		 * Update user object(s) (Bulk update)
		 * Input: user object(s)
		 * Output: Success message
		 * This function is used to for bulk updation for user object(s)
		 */
		 exports.bulkUpdate = function(req, res) {
		 	var outputJSON = "";
                        //console.log(req);
		 	var inputData = req.body;
                        var i=0;
                        var fields = {};
                        var isUpdate = false;
                        var ids = [];
                        for(i = 0; i<inputData.data.length; i++){
                            if (i == 0) {
                                   if (inputData.data[i].hasOwnProperty('status')) {
                                          fields.status = inputData.data[i].status;
                                          isUpdate = true;
                                   }else{
                                         // break;
                                   }
                            }
                            ids[i] = inputData.data[i].id;
                        }
                        console.log()
                        if (isUpdate) {
                            userObj.bulkUpdate({$in:ids},fields,function (err,data) {
                                   if (err) {
                            			var response = {"status":'faliure',"messageId":"401","message":err};
	               				 res.status(401).json(response);
                                   }
                                   else{
                                          console.log(data);
                                          var response = {"status":'success',"messageId":"200","message":"Status Updated Successfully"};
                                          res.status(200).json(response);
                                   }
                            });    
                      }else{
                            userObj.removeUser({$in:ids},function (err) {
                                  if (err) {
                            			var response = {"status":'faliure',"messageId":"401","message":err};
	               				 res.status(401).json(response);
                                   }
                                   else{
                                           var response = {"status":'success',"messageId":"200","message":"users removed successfully"};
                                          res.status(200).json(response);
                                   } 
                            })
                        }
		 	
		 	//res.jsonp(outputJSON);
		 }