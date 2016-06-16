var wishlistObj = require('./../../models/listings/wishlist.js');
var mongoose = require('mongoose');
var constantObj = require('./../../../constants.js');


exports.addwishlist = function(req,res){
  

		if (!req.body.travellerid) {
				   var response = {"status":'faliure',"messageId":"401","message":"You need to log in first!"};
									res.status(401).json(response);	
					   
				   }
		else{
			var arr=req.body.hostid;
				if(Array.isArray(arr)){
					
					for(var i=0;i<arr.length;i++){
                                                var details= {};
						details.travellerid= req.body.travellerid;
						details.hostid= arr[i];
						if(req.body.listingid){details.listingid= req.body.listingid;}
						wishlistObj.wishlist(details, function(err,data){
							
							})
						
					}
						var response = {"status":'success',"messageId":"200","message":"Host is added to WishList!"};
						res.status(200).json(response);
				
				}
				else if(typeof(req.body.hostid)=== 'string'){
						var details= {};
						details.travellerid= req.body.travellerid;
						details.hostid=req.body.hostid;
						if(req.body.listingid){details.listingid= req.body.listingid;}
                                                wishlistObj.showdetails(details, function(err,data){
                                                   if (data==null) {                                                      //code
                                                   
                                                   
                                                      wishlistObj.wishlist(details, function(err,data){
                                                              if(err){
                                                                      var response = {"status":'faliure',"messageId":"401","message":"hostId not define!"};
                                                       res.status(401).json(response);	
                                                                      }
                                                              else{
                                                                      var response = {"status":'success',"messageId":"200","message":"Host is added to WishList!"};
                                                                      res.status(200).json(response);
                                                              }
                                                      })
                                                   }
                                                   else{
                                                     var response = {"status":'faliure',"messageId":"401","message":"Host is already exist in wishlist!"};
                                                       res.status(401).json(response);
                                                   }
                                                })
				}
				else{
					var response = {"status":'faliure',"messageId":"401","message":"hostId not define!"};
	               				 res.status(401).json(response);	
				}
		}
}
exports.showwishlist = function(req,res){ 
	 if (!req.body.travellerid  && !req.body.pageCount &&  !req.body.perPage) {
				var response = {"status":'faliure',"messageId":"401","message":"You need to log in first!"};
	               				 res.status(401).json(response);	
					
				}
				else{ console.log("in view");
				wishlistObj.show(req.body.travellerid,req.body.pageCount,req.body.perPage, function(err,data){
							if(err){
                              console.log(err);
								var response = {"status":'faliure',"messageId":"401","message":"wishlist not found!"};
	               				 res.status(401).json(response);	
								}
							else{
								var response = {"status":'success',"messageId":"200","message":"User WishList !","wishlist":data};
								res.status(200).json(response);
							}
					})
				}
}
exports.removewishlist = function(req,res){
	if(!req.body.travellerid) {
				var response = {"status":'faliure',"messageId":"401","message":"You need to log in first!"};
	               				 res.status(401).json(response);				
	}
	else{
		var details={};
		details.travellerid=req.body.travellerid;
		details.hostid=req.body.hostid;
		wishlistObj.showdetails(details, function(err,data){
							if(err){
								var response = {"status":'faliure',"messageId":"401","message":"Host is already deleted!"};
	               				 res.status(401).json(response);	
								}
							else{
								var id= data._id
								wishlistObj.remove(id,function(err,data){
								 if (err){ 
										  var response = {"status":'faliure',"messageId":"401","message":"Host is already deleted!"};
			               				 res.status(401).json(response);}
								 	else{
								 		var response = {"status":'success',"messageId":"200","message":"Host deleted successfully from traveller WishList !"}
										res.status(200).json(response);
								 	}

								})	
									
							}
		})
	}
}
