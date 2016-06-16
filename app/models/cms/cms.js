var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cmsSchema = new mongoose.Schema
         ({
                  title:{type: String},
                  description: {type:String},
                  status: {type:Boolean, default:true},
                  createdDate:{type:Date, default: Date.now()},
                  modifiedDate:{type:Date, default: Date.now()}
         },{collection:'cmspages'});
         var cmsObj = mongoose.model('cmspages', cmsSchema);
         exports.findPageList = function(next){
                  cmsObj.find({},function(err,data){
                  //console.log(data);
                  next(err,data);
                  })
         }
         exports.viewPage = function(query,next){
                  cmsObj.findOne(query, next);
         }
         exports.Updatepage = function(id,data,next){
                  //console.log(data);return;
                  //var id=mongoose.Types.ObjectId(id);
                  cmsObj.findByIdAndUpdate(id,data,next);
         }