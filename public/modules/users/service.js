"use strict"

angular.module("Users")

.factory('UserService', ['$http', 'communicationService', function($http, communicationService) {

	var service = {};


	service.getUserList = function(callback) {
			communicationService.resultViaGet(webservices.userList, appConstants.authorizationKey, headerConstants.json, function(response) {
			callback(response.data);
		});

	}

	service.saveUser = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.addUser, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
			callback(response.data);
		});
	}


	service.getUser = function(userId, callback) {
		//console.log(userId);
		var serviceURL = webservices.findOneUser + "/" + userId;
		communicationService.resultViaGet(serviceURL, appConstants.authorizationKey, "", function(response) {
			callback(response.data);
		});
	}

	service.updateUser = function(inputJsonString, userId, callback) {
		var serviceURL = webservices.update + "/" + userId;
		communicationService.resultViaPost(serviceURL, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
		callback(response.data);
		});
	}

	service.updateUserStatus = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.bulkUpdateUser, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
			callback(response.data);
		});
	}

	service.listreviews = function(jsondata , callback) { 
			console.log("in service")
			communicationService.resultViaPost(webservices.listreviews, appConstants.authorizationKey, headerConstants.json, jsondata , function(response) {
			callback(response.data);
		});
	}
	service.addoffer=function(details,callback){ 
		var jsondata ={"category_Name":details.category_Name,"discount":details.discount,"coupon_name":details.coupon_name,"category_id":details.category_id,"title":details.title,"start_date":details.start_date,"valid_date":details.valid_date,"createdDate":Date.now(),"modifiedDate":Date.now()}
		console.log("??????",jsondata);
		communicationService.resultViaPost(webservices.addoffer,appConstants.authorizationKey,headerConstants.json,jsondata, function(response){
				callback(response.data);
			})
	}
	service.offertype=function(details,callback){ 
		var jsondata ={"offer_name":details.offer_name}
		communicationService.resultViaPost(webservices.offertype,appConstants.authorizationKey,headerConstants.json,jsondata, function(response){
				callback(response.data);
			})
	}
	service.offerviews = function(jsondata , callback) { 
	
			communicationService.resultViaPost(webservices.offerviews, appConstants.authorizationKey, headerConstants.json, jsondata , function(response) {
			callback(response.data);
		});

	}
	service.offerlist = function(jsondata , callback) {

			communicationService.resultViaPost(webservices.offerlist, appConstants.authorizationKey, headerConstants.json, jsondata , function(response) {
			
			callback(response.data);
		});

	}
	service.deleteoffer = function(objectId, callback) {
		var jsondata = {"_id":''+objectId+''}
		
		communicationService.resultViaPost(webservices.deleteoffer,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
	};
	service.deleteofferdetail = function(objectId, callback) { console.log("in service")
		var jsondata = {"_id":''+objectId+''}
		
		communicationService.resultViaPost(webservices.deleteofferdetails,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
	};
	service.roleviews = function(jsondata , callback) { console.log("in service");
	
			communicationService.resultViaPost(webservices.getuserType, appConstants.authorizationKey, headerConstants.json, jsondata , function(response) {
			callback(response.data);
		});
	};
	return service;


}]);
