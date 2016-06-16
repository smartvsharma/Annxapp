var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var offerSchema = new mongoose.Schema
         ({
                  title:{type: String},
                  category_id: {type:Number},
                  coupon_name: {type:String},
                  status:{type:Boolean,default:true},
                  createdDate:{type:Date},
                  modifiedDate:{type:Date},
                  start_date:{type:Date},
                  valid_date:{type:Date},
                  valid_copons:{type:Number},
                  coupon_code:{type:String}                  
                  //is_deleted:{type:Boolean, default:false}
	     });
  var offerObj = mongoose.model('offer', offerSchema);

  exports.addoffer = function(data, next){ 
    var offer = new offerObj(data);
    offer.save(next);
}

var offertypeSchema=new mongoose.Schema({
  offer_name:{type:String}
})
var offertypeObj =mongoose.model('offertype',offertypeSchema);

exports.offertype = function(details,next){ console.log(details)
  var offertype1= new offertypeObj(details);
    offertype1.save(next);
}
exports.offerviews =function(obj,next){
    offertypeObj.find({},next);
  }
exports.offerlist =function(obj,next){
    offerObj.find({},next);
  }

exports.deleteoffer = function(appDetails, next){
    offertypeObj.remove(appDetails,next);
}
exports.deleteofferdetail = function(appDetails, next){
    offerObj.remove(appDetails,next);
}