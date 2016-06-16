		var roleObj = require('./../../models/roles/roles.js');
		var mongoose = require('mongoose');
		var constantObj = require('./../../../constants.js');
		 var offerObj = require('./../../models/promotions/offers.js');

		 exports.roletype = function(req,res){

				var details=req.body;

				
				roleObj.roletype(details,function(err,data){ 
					if(err){
			                res.send(err);
			            }else{	  
			                var response = {"status":'success','messageId':200,"message":"Role added successfully","data":data};
			                res.send(response);
			            }
				})

		 }
 exports.roleviews=function(req,res){

  if(req.body.offer== "all"){

        roleObj.roleviews({},function(err,data1){
          
                    if(err){ console.log(err)
                              res.jsonp({'status':'faliure', 'messageId':401, 'message':'Roles not find!'}); 
                        }
                        else{
                              res.jsonp({'status':'success', 'messageId':200, 'message':'Role types !',"reviews":data1});
                              	
                        }
        })
    }
}
exports.deleterole = function(req, res, next){
          var appDetails = req.body;
          roleObj.deleterole(appDetails,function(err, data){
            if(err){
              res.send(err);
            }else{
              res.send({"status":'200',"message":'offer Deleted Successfully'});
            }
          });
      
  }
      
  exports.deleteoffer = function(req, res, next){
              var appDetails = req.body;
              offerObj.deleteofferdetail(appDetails,function(err, data){
                     if(err){
                       res.send(err);
                     }else{
                       res.send({"status":'200',"message":'offer Deleted Successfully'});
                     }
              });
      
       }








		 