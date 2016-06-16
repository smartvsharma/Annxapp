var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var whishlistSchema = new mongoose.Schema
         ({
                  hostid:{type:String,ref:'user'},
                  travellerid:{type:String,ref:'user'},
                  listingid:{type:String},
                  createdDate:{type:Date, default: Date.now()},
                  modifiedDate: {type:Date, default: Date.now()},
                  status:{type:Boolean,default:true},
                  listflag:{type:Boolean,default:false}
         },{collection:'wishlist'});
         
         
var wishlistObj = mongoose.model('wishlist', whishlistSchema);
         
exports.wishlist = function(details,next){ 
        var wish= new wishlistObj(details);
        wish.save(next);
      
      
}
exports.show =function(details, pageNo, perPage, next){
         
          wishlistObj.find({"travellerid":details}).populate('hostid').skip((pageNo-1)*perPage).limit(perPage).exec(next);
}

exports.showdetails = function(details,next){
     wishlistObj.findOne({"travellerid":details.travellerid,"hostid":details.hostid},next);
}

exports.remove = function(id,next){ 
    wishlistObj.remove({_id:mongoose.Types.ObjectId(id)},next);
 }