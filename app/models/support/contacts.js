var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contactSchema = new mongoose.Schema
         ({
                  name:{type: Number},
                  email: {type:string},
                  subject:{type:string},
                  comment:{type:string},
                  phone:{type:string},
                  status:{type:Boolean,default:false},
                  createdDate:{type:Date},
                  modifiedDate:{type:Date}

                  
                  //is_deleted:{type:Boolean, default:false}
	     });