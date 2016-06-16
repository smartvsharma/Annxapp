var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var couponSchema = new mongoose.Schema
         ({
                  parentid:{type: Number},
                  category_name: {type:string},
                  description: {type:string},
                  status:{type:Boolean,default:false},
                  createdDate:{type:Date},
                  modifiedDate:{type:Date},
                  //is_deleted:{type:Boolean, default:false}
	     });