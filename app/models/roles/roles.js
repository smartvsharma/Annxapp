var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var roleSchema=new mongoose.Schema({
  role:{type:String},
  status:{type:Boolean,default:true},
  created_date:{type:Date}
})
var roleObj =mongoose.model('roles',roleSchema);



exports.roletype=  function(details,next){

  var role1= new roleObj(details);
    role1.save(next)
  
}
exports.roleviews =function(obj,next){
    roleObj.find({},next);
  }
  exports.deleterole = function(appDetails, next){
    roleObj.remove(appDetails,next);
}

