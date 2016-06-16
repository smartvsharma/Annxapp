var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var listingSchema = new mongoose.Schema
         ({
                  hostid:{type: Number},
                  title: {type:String, required:true},
                  discription: {type:String, required: true},
                  city: {type: String},
                  state: { type: String},
                  country: {type: String},
                  zipcode: {type: String},
                  latitude: {type: Number},
                  longitude: {type: Number},
                  images:{type:String},
                  category_offered:{type:String},
                  services_offered:{type:String},
                  price:{type:String,required:true},
                  status:{type:Boolean,default:false},
                  image_path:{type:String},
                  createdDate:{type:Date},
                  modifiedDate:{type:Date},
                  //is_deleted:{type:Boolean, default:false}
	     });