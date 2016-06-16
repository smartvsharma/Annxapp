var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paymentSchema = new mongoose.Schema
         ({
                  listingId:{type: Number},
                  travellerId: {type:Number},
                  status:{type:Boolean,default:false},
                  paymentDate:{type:Date},
                  modifiedDate:{type:Date}

                  
                  //is_deleted:{type:Boolean, default:false}
	     });