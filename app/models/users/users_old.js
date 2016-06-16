var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema
         ({
                  firstname: {type:String, required:true},
                  lastname: {type:String, required: true},
                  email: {type: String,required: true},
                  password: { type: String,required:true },
                  phone: {type: String},
                  dob: {type: String},
                  age: {type: Number},
                  address:{type:String, required: true},
                  gender:{type:String,required: true},
                  device_id:{type:String,required: true},
                  device_type:{type:String,required:true},
                  user_type:{type:String,required:true},
                  status:{type:Boolean,default:false},
                  image_path:{type:String},
                  latitude:{type:Number},
                  longitude:{type:Number},
                  createdDate:{type:Date},
                  modifiedDate:{type:Date},
                  //is_deleted:{type:Boolean, default:false}
	     });

userSchema.path("email").validate(function(value) {
 var validateExpression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
   return validateExpression.test(value);
}, "Please enter valid email address");

userSchema.path("password").validate(function(value){
	var validateExpression = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
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

userSchema.path("image_path").validate(function(value){
	var validateExpression = /\.(jpe?g|png|gif|bmp)$/i;
	return validateExpression.test(value);
},"Enter valid image path");


var userObj = mongoose.model('user', userSchema);
module.exports = userObj;