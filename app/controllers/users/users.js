var userObj = require('./../../models/users/users.js');
var wishlistObj = require('./../../models/listings/wishlist.js');
var reviewObj = require('./../../models/listings/review.js');
var offerObj = require('./../../models/promotions/offers.js');
var mongoose = require('mongoose');
var moment = require('moment');

var constantObj = require('./../../../constants.js');
var paths = require('path');
var url = require('url')
var fs = require('fs');
var request = require('request');
var nodemailer = require('nodemailer');
var md5=require('md5');
var formidable = require('formidable');


              var appDir = paths.dirname(require.main.filename);
              console.log(appDir);
                     exports.failureRedirect = function(req,res){
                     res.jsonp({'status':'faliure', 'messageId':401, 'message':'Either username or password is not valid!'});
              }

              exports.facebookcheck = function(req,res){

                     if(req.body.login_type=="Facebook"){
						
						console.log("id",req.body.id);
						
                            if(!req.body.id){
                                   res.jsonp({'status':'faliure', 'messageId':401, 'message':'Facebook Authentication Failed!'});
                            }

                            else{
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
                                          details.login_type= req.body.login_type;
                                          details.facebookId=req.body.id;
                                          details.email=req.body.email;
                                          details.gender=req.body.gender; 
                                          if(req.body.profile_path){
											    console.log(req.body.profile_path);
                                                 details.image_path=req.body.profile_path;
                                          }

                                          userObj.authenticate(details.facebookId, function(err, user) {  
                                                 if(err) {
                                                        var response = {"status":'faliure',"messageId":"401","message":"password and confirm password not matched"};
                                                        res.status(401).json(response);
                                                 }
                                                 else{
													    var pro = paths.resolve(appDir+"./../public/images/profile_pic/");
														
                                                        if(user == null){
                                                               var dateTime = Math.floor(Date.now() / 1000);
                                                               var profilePic=    dateTime +"_profile_pic.jpg";
															   	
                                                               download(details.image_path,pro+"/"+profilePic, function(){
															
                                                                      var host= req.get('host');
                                                                      var protocall=req.protocol;
                                                                      //console.log(host);
																	  if(details.image_path){
																			details.image_path= protocall+'://'+host+'/images/profile_pic/'+profilePic;
																			}
                                                                      //console.log(details.image_path);
                                                                      userObj.insert(details,function(err,user){
                                                                             if(err){
                                                                                   res.jsonp({'status':'failure', 'messageId':401, 'message':'User not find'});
                                                                             }
                                                                             else{                            
                                                                                    req.session.user = user;
                                                                                    var data={};
                                                                                    data.userId= user._id;
                                                                                    data.device_id= req.body.device_id;
                                                                                    data.device_type=req.body.device_type;
                                                                                    userObj.device(details,function(err,data){
                                                                                           if(err){
                                                                                                  res.jsonp({'status':'faliure', 'messageId':401, 'message':'Either device_id or device_type is not available!'});
                                                                                           }
                                                                                           else{
                                                                                                  res.jsonp({'status':'success', 'messageId':200, 'message':'User logged in successfully',"userdata":user});
                                                                                           }
                                                                                           })
                                                               //res.jsonp({'status':'success', 'messageId':200, 'message':'User logged in successfully',"userdata":user});
                            
                                                                             }
                                                                      })
                                                               });
                                                               
                                                        }
                                                        else{
                                                               if(user.email==req.body.email && user.facebookId==req.body.id)
                                                               {
                                                               req.session.user = user;
                                                               res.jsonp({'status':'success', 'messageId':200, 'message':'User logged in successfully',"userdata":user});
                                                               }
                                                        }
                            
                                                 }
                                          })
                            }

                     }
                     else if(req.body.login_type=="Google"){
						console.log("in google")
							if(!req.body.id){
								   res.jsonp({'status':'faliure', 'messageId':401, 'message':'Google Id required!'});
							}
                            else{
                                   var details = {};
                                   if(req.body.firstname){details.firstname= req.body.firstname;}
                                   if(req.body.phone){details.phone= req.body.phone;}
                                   if(req.body.dob){details.dob= req.body.birthday;}
                                   if(req.body.user_type){details.user_type= req.body.user_type;}
                                   details.login_type= req.body.login_type;
                                   details.google_id=req.body.id;
                                   details.email=req.body.email;
                                   details.gender=req.body.gender;
                                   if(req.body.profile_path){
									details.image_path=req.body.profile_path;
									}

                                   userObj.authenticate(details.google_id, function(err, user) {    
                                                 if(err) {
                                                        //console.log("error"+err)
                                                        var response = {"status":'faliure',"messageId":"401","message":"Google Authentication Failed!"};
                                                        res.status(401).json(response);
                                                 }
                                                 else{
													 var pro = paths.resolve(appDir+"./../public/images/profile_pic/");
                                                               if(user == null){
                                                                       var dateTime = Math.floor(Date.now() / 1000);
                                                                      var profilePic=    dateTime +"_profile_pic.jpg";
                                                                      download(details.image_path,pro+"/"+profilePic, function(){
                                                                      var host= req.get('host');
                                                                      var protocall=req.protocol;
                                                                      //console.log(host);
																	  if(details.image_path){
																		details.image_path= protocall+'://'+host+'/images/profile_pic/'+profilePic;
																	  }
                                                                      //console.log(details.image_path);
                                                                      userObj.insert(details,function(err,user){
                                                                      if(err){ //console.log(err)
                                                                             return done(null, false);
                                                                      }                                                                                                  
                                                                      else{//console.log("++++ "+user);                          
                                                                             req.session.user = user;
                                                                             var data={};
                                                                             data.userId= user._id;
                                                                             data.device_id= req.body.device_id;
                                                                             data.device_type=req.body.device_type;
                                                                             userObj.device(details,function(err,data){
                                                                                    if(err){
                                                                                           res.jsonp({'status':'faliure', 'messageId':401, 'message':'Something went wrong!'});
                                                                                    }
                                                                                    else{
                                                                                           res.jsonp({'status':'success', 'messageId':200, 'message':'User logged in successfully',"userdata":user});
                                                                                    }
                                                                             })
                                                               //res.jsonp({'status':'success', 'messageId':200, 'message':'User logged in successfully',"userdata":user});
                            
                                                                      }
                                                                      })
                                                                      });
                                                               }
                                                               else{
                                                                      if(user.email==req.body.email && user.google_id==req.body.id)
                                                                      {
                                                                             req.session.user = user;
                                                                             res.jsonp({'status':'success', 'messageId':200, 'message':'User logged in successfully',"userdata":user});
                                                                      }
                                                               }

                                                 }
                                   })
                            }
                            
                     }
                                   else{
                                   res.jsonp({'status':'faliure', 'messageId':401, 'message':'something wrong here'});
                                   }
                     }

//authenticate
       exports.authenticate = function(req, res) {

                     var details={};
                     details.userId= req.user._id;
                     details.device_id= req.body.device_id;
                     details.device_type=req.body.device_type;
                     userObj.device(details,function(err,data){
                     if(err){
                     res.jsonp({'status':'faliure', 'messageId':401, 'message':'Either device_id or device_type is not available!',"userdata":req.user});
                     }
                     else{
                     res.jsonp({'status':'success', 'messageId':200, 'message':'User logged in successfully',"userdata":req.user});
                     }
                     })

                     }
       exports.signupUser = function(req,res)               
                     {
                     var userDetails = (req.body);
                     
                     userDetails['password'] = md5(req.body.password)
                     
                     userObj.findemail(req.body.email,function(err,data){
                     
                     if(data==null){
                     
                            userObj.addUser(userDetails, function(err, data1){
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
                            text: '<p>WelCome to AnnxApp Service, User registered successfully</p>'
                            };
                            transporter.sendMail(mailOptions, function(error, response){
                     if(error){
                            console.log(error);
                            }
                     else{
                            var response = {"status":'success',"messageId":"200","message":"user add successfully!","userdata":data1};
                            res.status(200).json(response);
                            //return res.status(200).send(response)
                     }
                     });
                     }
                     })
                     }
                     else{
                            var response = {"status":'faliure',"messageId":"401","message":"email id already exist"};
                            res.status(401).json(response);
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
		if(req.body.email){details.email= req.body.email;}
		if(req.body.address){details.address= req.body.address;}
		if(req.body.city){details.city= req.body.city;}
		if(req.body.state){details.state= req.body.state;}
		if(req.body.zip_code){details.zip_code= req.body.zip_code;}
		if(req.body.user_type){details.user_type= req.body.user_type;}
		
		if (!req.body.id) {
				var response = {"status":'faliure',"messageId":"401","message":"You need to log in first!"};
				res.status(401).json(response);	
				
		}
		else{
			userObj.editprofile(req.body.id,details, function(err, data){
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

       var savedata = function(req,res,fields) { 
              console.log(">>>>>>>>>>>",fields);
              userObj.editprofile(fields.id,fields, function(err, data){
                     
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
                            messages += 'User Name Already Exist';
                            }
                     }
                     else{
                            //var data= {"image_path":fields.image_path,"firstname":fields.firstname,"lastname":fields.lastname,"address": fields.address,"age": fields.age,"google_id": fields.google_id,"zip_code": fields.zip_code,"user_type": fields.user_type,"phone": fields.phone,"email": fields.email,"fb_id": fields.fb_id,"state": fields.state,"city": fields.city,"gender": fields.gender,"status":fields.status,"login_type":fields.login_type};
                            var data=fields;
                            messages = "user Edited Successfully";
                            status = 'success';
                            messageId='200'
                     }
                     res.send({"status":status,"message":messages,messageId:messageId,"data":data});
              
              });
              }


              exports.edituserprofile = function(req, res) {
              //console.log('geeting in');return;
              var form = new formidable.IncomingForm();
              form.uploadDir = paths.resolve((appDir+"./../public/images/profile_pic"));       //set upload directory
              form.keepExtensions = true;     //keep file extension
              form.parse(req, function(err, fields, files) {
              console.log(fields);
              if (files && files != {}) {
                     //var Date1=new Date();
                     var dateTime = Math.floor(Date.now() / 1000);
                     //console.log(dateTime);
                     
                     var FileData = files.image_path ? files.image_path : files.null;
                     console.log(FileData);
                     console.log(FileData.path);
                     fs.rename(FileData.path, paths.resolve(appDir+"./../public/images/profile_pic/"+dateTime +FileData.name),function(err) {
                     //console.log("rename ");
                     if (err){
                           // console.log(err);
                            throw err;
                     }
                     else {
                     var host= req.get('host');
                     var protocall=req.protocol;
                     fields['image_path']= protocall+'://'+host+'/images/profile_pic/'+dateTime +FileData.name;
                     //console.log(fields);
                      
                     var img = {};
                     if (typeof fields['image_path'] !="undefined") {
                            if (fields.id) {
                                   savedata(req,res,fields);							       
                            }else{
                                   var response = {"status":'faliure',"messageId":"401","message":"No user found to update"};
				   res.status(401).json(response);
                            }
                            
                     }
                     }
                     });
              }
              else {
                      
                     if (fields.id) {
                            savedata(req,res,fields);							       
                     }else{
                            var response = {"status":'faliure',"messageId":"401","message":"No user found to update"};
                            res.status(401).json(response);
                     }
              }  
       });
       }

      
          


exports.forgot_password = function(req, res) {

	var details=req.body.email;
	var resetUrl = "http://"+ req.headers.host +"/users/reset_password";

	userObj.forgot_password(details, function(err, data) {
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
                     console.log("in reset_password");
                     if(req.body.password === req.body.confirm_password){ 
                            var details={};
                            details.email= req.body.email;
                            details.password=req.body.password;
                            details['password'] = md5(req.body.password);
                            userObj.reset_pass(details,function(err, data){
                            console.log(details);
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
                                          messages += 'Something happen wrong';
                                   }
                                   var response = {"status":'faliure',"messageId":"401","message":messages};
                                   res.status(401).json(response);
                                   }
                                   else{
                                   var response = {"status":'success',"messageId":"200","message":"Password reset successfully!"};
                                   res.status(200).json(response);
                                   }
                            })
              }
              else
              {

                     var response = {"status":'faliure',"messageId":"401","message":"password and confirm password not matched"};
                     res.status(401).json(response);
                     }
              }

exports.viewUser= function(req,res){
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
if (!req.body.id) {
var response = {"status":'faliure',"messageId":"401","message":"User alreay LogOut!"};
res.status(401).json(response);	

}
else{

var id= req.req.body.id;

userObj.delete(id,function(err,data){
})
req.session.user= null;
var response = {"status":'success',"messageId":"200","message":"User LogOut successfully!"};
res.status(200).json(response);
}
} 


      exports.search = function(req,res){
	var details= {};

	if(req.body.user_type=="Host"){

		var searchTrim=req.body.search;
		var search = searchTrim.trim();
		console.log(JSON.stringify(search));

		
	userObj.search(search,function(err,data){
		
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
						messages += ' no result to display';
					}
					var response = {"status":'faliure',"messageId":"401","message":messages};
	               	res.status(401).json(response);
				}
				else{
					var response = {"status":'success',"messageId":"200","message":"host list!","data":data};
	               	res.status(200).json(response);
			}
		
		})
	}
}
     
	 exports.addreview = function(req,res){
    
    var details= {};
    if(req.body.hostid){details.hostid=req.body.hostid;}
    if(req.body.travellerid){details.travellerid=(req.body.travellerid);}
    if(req.body.review){details.review= req.body.review;}
    if(req.body.rating){details.rating= req.body.rating;}
    //if(req.body.createdDate){details.createdDate= req.body.createdDate;}
    
    console.log("*****"+req.body.hostid);

    if(!req.body.hostid ){
       res.jsonp({'status':'faliure', 'messageId':401, 'message':'either host details missing or traveller details !'}); 
    }
    else{
        reviewObj.addreview(details, function(err,data){

               res.jsonp({'status':'success', 'messageId':200, 'message':'review and rating submit scessfully!',"data":data}); 
        	
        })
    }
}

exports.ratingavg=function(req,res){
 console.log("in app controller"+req.body.hostid);

  if(req.body.hostid== "all"){

        reviewObj.findrating({},function(err,data1){
          
                    if(err){ console.log(err)
                              res.jsonp({'status':'faliure', 'messageId':401, 'message':'host not find!'}); 
                        }
                        else{
                              res.jsonp({'status':'success', 'messageId':200, 'message':'Host Rating !',"reviews":data1});
                              	
                        }
        })
    }else{
            if(!req.body.hostid ){
               res.jsonp({'status':'faliure', 'messageId':401, 'message':'either host details missing or traveller details !'}); 
            }
            else{
            reviewObj.find(req.body.hostid,function(err,data1){
                    var review=[];
                    for(var i=0;i<data1.length;i++){
                                    review.push(data1[i].review);        
                    }
                    reviewObj.ratingavg(req.body.hostid, function(err,data){
                        if(err){
                              res.jsonp({'status':'faliure', 'messageId':401, 'message':'host not find!'}); 
                        }
                        else{
                              res.jsonp({'status':'success', 'messageId':200, 'message':'Host Rating !',"data":data,"reviews":review}); 
                        }
                    })
            })        
        }
    }
}  
 exports.addoffer= function(req,res){
	var  dateMask = 'YYYY-MM-DD';
	  var details = {};
         details.category_Name=req.body.category_Name;
         details.discount=req.body.discount;
	  details.coupon_name=req.body.coupon_name;
	  details.title=req.body.title;
	  details.category_id=req.body.category_id;
	  details.start_date=moment(req.body.start_date).format(dateMask);
	  details.valid_date=moment(req.body.valid_date).format(dateMask);
	  details.createdDate=moment(req.body.createdDate).format(dateMask);
	  details.modifiedDate=moment(req.body.modifiedDate).format(dateMask);

	   console.log("**** app con"+JSON.stringify(details));

        offerObj.addoffer(details,function(err, data){
            if(err){
                var response = {'status':'faliure', 'messageId':401, 'message':'offer not added successfully!'};
                res.send(response);
            }else{	  console.log("**** app con"+JSON.stringify(data));
                var response = {"status":'success','messageId':200,"message":"Offer added successfully"};
                res.send(response);
            }
        });
}
exports.offertype = function(req,res){
	var details=req.body;
	offerObj.offertype(details,function(err,data){
		if(err){
                res.send(err);
            }else{	  console.log("**** app con"+JSON.stringify(data));
                var response = {"status":'success','messageId':200,"message":"offer Type added successfully"};
                res.send(response);
            }
	})
}

exports.offerviews=function(req,res){

  if(req.body.offer== "all"){

        offerObj.offerviews({},function(err,data1){
          
                    if(err){ console.log(err)
                              res.jsonp({'status':'faliure', 'messageId':401, 'message':'offer not find!'}); 
                        }
                        else{
							 var response = ({'status':'success', 'messageId':200, 'message':'offer types !',"reviews":data1});
							res.send(response);
                              //res.jsonp({'status':'success', 'messageId':200, 'message':'offer types !',"reviews":data1});
                              	
                        }
        })
    }
}
exports.offerlist= function(req,res){
	if(req.body.offer== "all"){

        offerObj.offerlist({},function(err,data1){
          
                    if(err){ console.log(err)
                              res.jsonp({'status':'faliure', 'messageId':401, 'message':'offer not find!'}); 
                        }
                        else{
                              res.jsonp({'status':'success', 'messageId':200, 'message':'offer listing !',"reviews":data1});
                              	
                        }
        })
    }
}
  exports.deleteoffer = function(req, res, next){
          var appDetails = req.body;
          offerObj.deleteoffer(appDetails,function(err, data){
            if(err){
              res.send(err);
            }else{
              res.send({"status":'200',"message":'offer Deleted Successfully'});
            }
          });
      
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
	userObj.getAllUsers({}, function(err, data) {
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
                     //console.log('update_user')
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
                            //console.log(err);
                            //console.log(data);
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
              exports.userOne=function(req,res){
                     if (req.params.id) {
                     userObj.viewUser2({_id:req.params.id},function(err,data){
                            if(err) {
                            outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
                            }
                            else {
                                   outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 
                                   'data': data}
                            }
                            res.jsonp(outputJSON);
                            })
                     }

              }
              var download = function(uri, filename, callback){
				
								console.log('uri',uri);
								console.log('filename',filename);
							
								if(uri){
                                request.head(uri, function(err, res, body){
											if(err){
													console.log(">>>>>uri");
													}
													else{
														
														console.log('content-type:', res.headers['content-type']);
														console.log('content-length:', res.headers['content-length']);									
														var r = request(uri).pipe(fs.createWriteStream(filename));
														r.on('close', callback);
													}
								});
								}else{
									callback()
								}
								
                     };
                     
                     
              exports.changePassword = function(req,res){
                     userData = req.body;
                     console.log(userData);
                     userId=userData.id;
                     oldpassword=userData.oldpassword;
                     password=userData.password;
                     confirmpass=userData.confirmpass;
					 
                     if (password!=confirmpass){
                            var response = {"status":'faliure',"messageId":"401","message":"Password and Confirmpassword not matched"};
                                   res.status(401).json(response);    
                             //code
                     }else{
						
							
								
								// password = md5(password);
								userObj.findOldPassword(userId,function(err,data){ console.log(" "+data.password+" "+md5(password))
									if(err){
                                                                             console.log(err)}
									else{
											if(md5(password)==data.password){ console.log("in old password");
												 var response = {"status":'faliure',"messageId":"401","message":"New password and old Password are same."};
													 res.status(200).json(response); 
											}
											else if(md5(oldpassword)== data.password){
												 password = md5(password);
													userObj.updateUser2(userId,{'password':password},function(err,data){ console.log("after update"+JSON.stringify(data));														   if (err){
																  var response = {"status":'faliure',"messageId":"401","message":err};
																  res.status(401).json(response);  
														   }else{
			  
													}
													 })   
											}
                                                                                        else{
                                                                                            var response = {"status":'faliure',"messageId":"401","message":" Password did not match."};
													 res.status(200).json(response); 
                                                                                        }
                                                                      
									}
									
								})
								
					 }
			}
              
 exports.blockUser= function(req,res){ console.log("in block user")
              var details={}
              details.hostId=req.body.hostId;
              details.travellerId=req.body.travellerId;
              userObj.blockUser(details,function(err,data){ console.log(data)
                           if(err) {
                             var response = {"status":'success','messageId':401,"message":"User is not add to block list"};
                                   res.send(response);
                           
                            }
                            else {
                                    var response = {"status":'success','messageId':200,"message":"user is add to block list"};
                                    res.send(response);
                                
                            }
              })
}
                     
              