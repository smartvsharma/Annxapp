var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema
         ({
                firstname: {type:String, required:true},
                  lastname: {type:String},
                  email: {type: String,required: true,unique:true},
                  password: { type: String},
                  confirm_password: {type: String},
                  gender: {type:String},
                  phone: {type: String},
                  dob:  {type: String},
                  age: {type: Number},
                  address:{type:String},
                  city:{type:String},
                  state:{type:String},
                  zip_code:{type:Number},
                  login_type:{type:String},
                  fb_id:{type:String},
                  google_id:{type:String},
                  user_type: {type:String},
                  status:{type:Boolean,default:true},
                  image_path:{type:String},
                  createdDate:  Date,
                  modifiedDate:  Date
                  //is_deleted:{type:Boolean, default:false}
	     },{collection:'users'});


userSchema.path("email").validate(function(value) {
 var validateExpression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
   return validateExpression.test(value);
}, "Please enter valid email address");

userSchema.path("password").validate(function(value){
	var validateExpression = /^(.*\d)(?=.*[a-zA-Z]).{4,10}$/;
	return validateExpression.test(value);
},"Enter password with atleast 1 numeric value");

userSchema.path("dob").validate(function(value){
	var validateExpression = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
	return validateExpression.test(value);
},"Enter valid dob");

userSchema.path("phone").validate(function(value){
	var validateExpression =/^[ ()+]*([0-9][ ()+]*){10}$/;
	return validateExpression.test(value);
},"Enter phone no with atleast 10 digits");

//userSchema.path("image_path").validate(function(value){
//	var validateExpression = /\.(jpe?g|png|gif|bmp)$/i;
//	return validateExpression.test(value);
//},"Enter valid image path");


var userObj = mongoose.model('user', userSchema);
/*exports.check= function(details,next){ console.log("hfh"+details);
      userObj.find("email":details,next);
    
}*/

var updateUser = function(usedId,data, next){ console.log("user data"+usedId)
    users.update({'_id':usedId}, {$set:data}, next);
}

exports.addUser = function(details,next){//console.log("id***"+details._id)

     /* if (details._id) {
		
		updateUser(details._id,details, next);
      }else{*/
        var user= new userObj(details);
        user.save(next);
      //}
      
}
var updateUser = function(email,data, next){console.log("data in controller "+JSON.stringify(data));
    userObj.update({'email':email}, {$set:data}, next);
}
exports.reset_pass= function(details,next){

      if (details.email) {
            
            updateUser(details.email,details, next);
      }
    
}
exports.authenticate= function(details,next){//console.log("*******"+details);
         userObj.findOne({"email":details},function(err,data){
                  if(err) {
                 next(err,{});
             }
             else{//console.log("data"+data);
                 next(null,data);
             }
         })
}
exports.forgot_password = function(details,next){
    
      userObj.findOne({"email":details}, next);           
                
}
exports.viewUser= function(details,next){
    userObj.findOne({"email":details.email}, next);
}
var updateeditprofileUser = function(email,data, next){console.log("data in controller "+JSON.stringify(data));
    userObj.update({'email':email}, {$set:data}, next);
}
exports.editprofile = function(id,data, next){
    userObj.update({'_id':id}, {$set:data},next);
}
exports.bulkUpdate = function(id,data, next){
    console.log(id);
    console.log(data);
    console.log('in update')
    userObj.update({'_id':id}, {$set:data},{multi:true},next);
}
exports.removeUser = function(id, next){
    console.log(id);
    console.log(data);
    console.log('in remove')
    userObj.remove({'_id':id}, next);
}
exports.search = function(details,next){
    userObj.find(details,next);
}



//module.exports = userObj;
