var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookingSchema = new mongoose.Schema
         ({
                  listid:{type: Number},
                  travellerid: {type:Number},
                  hostid: {type:Number},
                  status:{type:Boolean,default:false},
                  booking_status:{type:Boolean,default:false},
                  createdDate:{type:Date},
                  modifiedDate:{type:Date},
                  //is_deleted:{type:Boolean, default:false}
	     });