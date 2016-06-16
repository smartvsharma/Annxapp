"use strict"

angular.module("cms")

.factory('cmsService', ['$http', 'communicationService', function($http, communicationService) {

	var service = {};


	service.getPagesList = function(callback) {
                        //console.log("in service");
			communicationService.resultViaGet(webservices.pageList, appConstants.authorizationKey, headerConstants.json, function(response) {
			callback(response.data);
		});

	}

	service.saveUser = function(inputJsonString, callback) {
			communicationService.resultViaPost(webservices.addUser, appConstants.authorizationKey, headerConstants.json, inputJsonString, function(response) {
			callback(response.data);
		});
	}


	service.getPage = function(pageId, callback) {
		//console.log(pageId);
		var serviceURL = webservices.findPage + "/" + pageId;
		communicationService.resultViaGet(serviceURL, appConstants.authorizationKey, "", function(response) {
			callback(response.data);
		});
	}

	service.updatePage = function(inputJsonString, PageId, callback) {
		var serviceURL = webservices.update + "/" + PageId;
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
	return service;


}]);
