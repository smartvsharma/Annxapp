"use strict"

angular.module("Roles")

.factory('roleService', ['$http', 'communicationService', function($http, communicationService) {

	var service = {};


	
/*
	service.getRoleList = function(callback) {
			communicationService.resultViaGet(webservices.roleList, appConstants.authorizationKey, headerConstants.json, function(response) {
			callback(response.data);
		});

	}
	service.updateRole = function(inputJsonString, roleId, callback) {
		    var serviceURL = webservices.updateRole + "/" + roleId;
		    console.log(serviceURL);
			communicationService.resultViaPost(serviceURL, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
			callback(response.data);
		});

	}
	service.getRole = function(roleId, callback) {
			var serviceURL = webservices.findOneRole + "/" + roleId;
			communicationService.resultViaGet(serviceURL, appConstants.authorizationKey, headerConstants.json, function(response) {
			callback(response.data);
		});

	}

	service.updateRoleStatus = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.bulkUpdateRole, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
			callback(response.data);
		});
	}*/
service.roletype=function(details,callback){ 
		var jsondata ={"role":details.role,"created_date":Date.now()}
		console.log("in service"+JSON.stringify(jsondata))
		communicationService.resultViaPost(webservices.roletype,appConstants.authorizationKey,headerConstants.json,jsondata, function(response){
				callback(response.data);
			})
	}
	service.roleviews = function(jsondata , callback) { 
	
			communicationService.resultViaPost(webservices.roleviews, appConstants.authorizationKey, headerConstants.json, jsondata , function(response) {
			callback(response.data);
		});

	}
service.deleterole = function(objectId, callback) {
		var jsondata = {"_id":''+objectId+''}
		
		communicationService.resultViaPost(webservices.deleterole,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
	};
	return service;


}]);
