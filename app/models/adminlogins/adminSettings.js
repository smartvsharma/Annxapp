var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var settingSchema = new mongoose.Schema
         ({
                  hostCommision:{type: Number},
                  travellerCommision: {type:Number},
                  adminContactmail: {type:string},
                  createdDate:{type:Date},
                  modifiedDate:{type:Date},
                  

                  
                  //is_deleted:{type:Boolean, default:false}
	     });