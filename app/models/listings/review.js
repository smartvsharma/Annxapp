var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewSchema = new mongoose.Schema
         ({
                  hostid:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
                  travellerid:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
                  title:{type:String},
                  review:{type:String},
                  rating:{type: Number},
                  createdDate:{type:Date},
                  modifiedDate:{type:Date},
                  status:{type:String,default:"able"}

	     });
         var reviewObj = mongoose.model('review', reviewSchema);

exports.addreview = function(details,next){ console.log(details);
        var review= new reviewObj(details);
        review.save(next);
  }

  exports.ratingavg = function(details,next){ console.log(details);
       //reviewObj.find({hostid:details},next);

    reviewObj.aggregate([{$match:{hostid:mongoose.Types.ObjectId(details)}},{$group:{"_id":"$hostid",count:{$avg:"$rating"}}}],next);
  }
  exports.find =function(details,next){
    reviewObj.find({hostid:details},next);
  }
/*  exports.findrating= function(obj,next){
      reviewObj.find(obj,function(err,data){
        console.log("66666 "+data);
        next(err,data);
      })*/

  exports.findrating = function(obj,next){
    console.log("object is"+obj);
    reviewObj.find({}).populate('hostid travellerid').exec(function(err,data){
      if(err)
        console.log(err)
      else{
        console.log(data);
        next(err,data);
      }
    });
 
}

exports.userrating = function(details,next){
         if(details.length > 0){
                  getAvgForAll(details,0,next)
         }else{
             next(null ,[])
         }


  }
var getAvgForAll = function(details,i,next){ 
  reviewObj.aggregate([
    {$match:{hostid:mongoose.Types.ObjectId(details[i]._id)}},
    {$group:{"_id":"$hostid",count:{$avg:"$rating"}}}
    ],function(err,data){
      if(err){
        next(err,null);
      }else{
        details[i].rating = data[0]?data[0].count: 0;
        
        if(details.length == i+1){

          next(null,details);
        }else{
          getAvgForAll(details,i+1,next)
        }
      }
    });
}