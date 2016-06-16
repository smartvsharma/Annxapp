var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var serviceSchema = new mongoose.Schema
         ({
                    name:{type: string},
                    description: {type:string},
                    category_id: {type:Number},
                    status:{type:Boolean,default:false},
                    createdDate:{type:Date},
                    modifiedDate:{type:Date},
                  //is_deleted:{type:Boolean, default:false}
	     });