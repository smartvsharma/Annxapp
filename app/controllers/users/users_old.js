var userObj = require('./../../models/users/users.js');
var mongoose = require('mongoose');
var constantObj = require('./../../../constants.js');
var nodemailer = require('nodemailer');

exports.failureRedirect = function(req,res){
    res.jsonp({'status':'faliure', 'messageId':401, 'message':'Either username or password is not valid!'});
}


exports.signupUser = function(req,res) 
{ 
	  

        var add = new userObj({
            "firstname":req.body.firstname,
            "lastname":req.body.lastname,
            "email":req.body.email,
            "password":req.body.password,
            "phone":req.body.phone,
            "dob":req.body.dob,
            "age":req.body.age,
            "address":req.body.address,
            "gender":req.body.gender,
            "device_id":req.body.device_id,
            "device_type":req.body.device_type,
            "user_type":req.body.user_type,
            "status":req.body.status,
            "image_path":req.body.image_path,
            "latitude":req.body.latitude,
            "longitude":req.body.longitude,
            "createdDate":new Date(),
            "modifiedDate":new Date(),
             //"is_deleted":req.body.is_deleted
})
           //console.log("dataaaaaaa",req.body);
          //var outputJSON = {"bsgs":"addad"};        
          add.save(function(err, data) 
        { 
          if(err) {
              var response=
              {
                "status":"401",
                "message":err
               }
                 return res.status(401).send(response)
             }
          if(data)
           {

              //var smtpTransport = nodemailer.createTransport("SMTP",{
              //       service: "Gmail",
              //       auth: {
              //            user: "gautamsapna6583@gmail.com",
              //            pass: "anjalisharma"
              //            }
              //     });
              //
              //var mailOptions = {
              //     from: 'gautamsapna6583@gmail.com',
              //     to: req.body.email,
              //     subject: 'User Registered!',
              //     text: 'hello'
              //       };
              //smtpTransport.sendMail(mailOptions, function(error, response){
              //     if(error){
              //         console.log(error);
              //     }else{
              //
              //                var response=
              //               {
              //                    "status":"200",
              //                    "message":"successfully saved data"
              //               }
              //              return res.status(200).send(response)
              //            }
              //              
              //   });
              var response=
                     {
                          "status":"200",
                          "message":"successfully saved data"
                     }
                    return res.status(200).send(response)
       }

  });


}


//forgot password
exports.forgot_password = function(req, res) {
      
	var outputJSON = "";
          
	userObj.findOne({
		email: req.body.email}, function(err, data) {
             
		if (err) {
			
			return res.send(err);


		}
        else if(data==null){
                    
            var response = {
                    "status":"Failed",
                    "messageId": 401,
                    "message": "User with this email doesn't exist"
            };
			return res.status(401).send(response);
                    
                }
                
        else {
			//console.log("req.body.password",req.body.password);

			var resetUrl = "http://"+ req.headers.host +"/#/reset-password";
			var smtpTransport = nodemailer.createTransport("SMTP",{
                              service: "Gmail",
                              auth: {
					       user: "gautamsapna6583@gmail.com",
					       pass: "anjalisharma"
                              }
                              });
            
                    var mailOptions = {
			        from: 'gautamsapna6583@gmail.com',
			        to: req.body.email,
			        subject: 'Password Reset Link',
			        text: "Follow this link to get reset your passsword::" + resetUrl + "/" 
			};
			 smtpTransport.sendMail(mailOptions, function(error, response){
		          if(error){
		              console.log(error);
		          }else{
		               console.log("Message sent: " + response.message);
		          }
   });

				var adding = new userObj({					
					"email": req.body.email,
					//"token": token,
					//"expirationPeriod": moment(new Date()).add(1, 'days').format()
				});

				
				adding.save(function(err, post) {
					if (err) {
						var response = {
                                                  "status":"Failed",
                                                  "messageId": 400,
                                                  "message": "Password reset link has not been sent on your email"
						};
						return res.status(401).send(response);
					}

					if (post) {
						var response = {
                                                  "status":"Sucess",
                                                  "messageId": 200,
                                                  "message": "Password reset link has been sent on your email"
						};

						return res.status(200).send(response)
					}
				});
            };
         })
	};

// 	var outputJSON = "";


// 	adminLoginObj.findOne({username:req.body.username}, function(err, data) {

// 		if(err) {
// 			outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
// 		}
// 		else {
			
// 			if(data) {

// 				var transporter = nodemailer.createTransport({
// 				    service: constantObj.gmailSMTPCredentials.service,
// 				    auth: {
// 				        user: constantObj.gmailSMTPCredentials.username,
// 				        pass: constantObj.gmailSMTPCredentials.password
// 				    }
// 				});				

// 				transporter.sendMail({
// 				    from: 'anurags@smartdatainc.net',
// 				    to: data.email,
// 				    subject: 'Your Password',
// 				    text: data.password
// 				});

// 				outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successSendingForgotPasswordEmail}
// 			}
// 			else {
// 				outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
// 			}

// 		}

// 		res.jsonp(outputJSON);

// 	});
// }

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

exports.reset_password = function(req,res){


userObj.update({
					email: data.email
				}, {
					$set: {
						"password": req.body.password
					}
				}, function(err, data) {

					if (err) {
						outputJSON = {
							'status': 'failure',
							'messageId': 203,
							'message': constantObj.messages.userStatusUpdateFailure

						}
						return res.status(203).send(err)
                      }
					if (data) {
						outputJSON = {
							'status': 'success',
							'messageId': 200,
							'message': constantObj.messages.userStatusUpdateSuccess
                        }
					
                   return res.status(200).send("successsss...")
						}
					}
					);

				}
			

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

              //authenticate
              exports.authenticate = function(req, res) {
                      res.jsonp({'status':'success', 'messageId':200, 'message':'User logged in successfully'});
              }
		/**
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
		 	userObj.find({}, function(err, data) {
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
		 	var inputData = req.body;
		 	var roleLength = inputData.data.length;
		 	var bulk = userObj.collection.initializeUnorderedBulkOp();
		 	for(var i = 0; i< roleLength; i++){
		 		var userData = inputData.data[i];
		 		var id = mongoose.Types.ObjectId(userData.id);  
		 		bulk.find({_id: id}).update({$set: userData});
		 	}
		 	bulk.execute(function (data) {
		 		outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.userStatusUpdateSuccess};
		 	});
		 	res.jsonp(outputJSON);
		 }