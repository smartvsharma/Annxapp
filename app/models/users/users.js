var md5=require('md5');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewObj = require('./../../models/listings/review.js');
var userSchema = new mongoose.Schema
         ({
                  firstname: {type:String},
                  lastname: {type:String},
                  email: {type: String,required: true},
                  password: { type: String},
                  confirm_password: {type: String},
                  gender: {type:String},
                  phone: {type: Number},
                  dob:  {type: String},
                  age: {type: Number},
                  address:{type:String},
                  city:{type:String},
                  state:{type:String},
                  zip_code:{type:Number},
                  login_type:{type:String,default: "Simple"},
                  facebookId:{type:String},
                  google_id:{type:String},
                  user_type: {type:String},
                  status:{type:Boolean,default:"true"},
                  rating:{type:String},
                  image_path:{type:String},
                  createdDate:{type:Date, default: Date.now()},
                  modifiedDate: {type:Date, default: Date.now()}
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

//userSchema.path("phone").validate(function(value){
//      var validateExpression =/[0-9]{10}/;
//      return validateExpression.test(value);
//},"Enter phone no with atleast 10 digits");

//userSchema.path("image_path").validate(function(value){
//    var validateExpression = /\.(jpe?g|png|gif|bmp)$/i;
//    return validateExpression.test(value);
//},"Enter valid image path");

var userObj = mongoose.model('user', userSchema);

var deviceSchema = new Schema({
  "userId":{type:String},
  "device_id":{type:String},
  "device_type":{type:String}
})

var deviceObj = mongoose.model('device', deviceSchema);

exports.updateUser2 = function(usedId,data, next){

    userObj.update({'_id':usedId}, {$set:data}, next);
}

exports.addUser = function(details,next){

    
        var user= new userObj(details);
        user.save(next);
      
      
}
var updateUser = function(email,data, next){
    userObj.update({'email':email}, {$set:data}, next);
}
exports.reset_pass= function(details,next){

      if (details.email) {
            
            updateUser(details.email,details, next);
      }
    
}
exports.authenticate= function(details,next){
         userObj.findOne({"email":details},function(err,data){
                  if(err) {
                 next(err,{});
             }
             else{
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
exports.viewUser2 = function(query,next){
    userObj.findOne(query, next);
}
var updateeditprofileUser = function(email,data, next){console.log("data in controller "+JSON.stringify(data));
    userObj.update({'email':email}, {$set:data}, next);
}
exports.editprofile = function(id,data, next){ 
    userObj.update({'_id':id}, {$set:data},next);
}
exports.search = function(details,next){
  var results=[]
  details = details.split(' ');
  var i = 0;
  for( i= 0; i < details.length; i++){
    details[i] = new RegExp(details[i],'i');
  }
  //for(var i=0;i<details.length;i++){
    if(details.length > 0){
        find(details,0,[],next)
    }else{
        next(null ,[])
    }
}


var find = function (details,i,result,next){
    var type =new RegExp('Host','i');
    userObj.find({$or:[
          {firstname:details[i]},
          {lastname:details[i]},
          {city:details[i]},
          {state:details[i]},
         
      ],user_type: type},function(err,data){
        if (!err) {  
             result = result.concat(data);
            if (details.length == i+1) {
                //perform last action
                //result.push(data);
               
               reviewObj.userrating(result, function(err,data){
                      next(null,data);
                })       

            }else{
                find(details,i+1,result,next)
            }
      }else{
        next(err,null);
      }
    
    });
}
exports.device= function(details,next){
 
var device= new deviceObj(details);
        device.save(next);
}
exports.delete =function(id,next){
  deviceObj.findOne({"userId":id}).remove().exec(function(err,data){
   
    next();
  })
}

exports.getAllUsers = function(obj,next){
  userObj.find(obj,function(err,data){
   
    next(err,data);
  })
}
exports.insert = function(details,next){
      

    
        var user= new userObj(details);

        user.save(next);
}


exports.findemail = function(email,next){
    userObj.findOne({email:email}, next);
}
exports.findOldPassword = function(userId,next){
    userObj.findOne({_id:userId},next);
}