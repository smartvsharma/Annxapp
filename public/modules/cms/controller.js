	"use strict";

	angular.module("cms")

	taxiapp.controller("cmsController", ["$scope", "$rootScope", "$localStorage","cmsService","ngTableParams",'$routeParams', '$route','$location','$timeout',   	function($scope, $rootScope, $localStorage,cmsService,ngTableParams,$routeParams, $route, $location,$timeout){
                
		
		if($localStorage.userLoggedIn) {
			$rootScope.userLoggedIn = true;
			$rootScope.loggedInUser = $localStorage.loggedInUsername;
		}
		else {
			$rootScope.userLoggedIn = false;
		}

		
		if($rootScope.message != "") {

			$scope.message = $rootScope.message;
		}

		//empty the $scope.message so the field gets reset once the message is displayed.
		$scope.message = "";
		$scope.activeTab = 0;
		$scope.user = {first_name: "", last_name: "", user_name: "", password: "", email: "", display_name: "", role: []}

	//Toggle multilpe checkbox selection
	$scope.selection = [];
	$scope.selectionAll;
	$scope.toggleSelection = function toggleSelection(id) {
			//Check for single checkbox selection
			if(id){
				var idx = $scope.selection.indexOf(id);
	            // is currently selected
	            if (idx > -1) {
	            	$scope.selection.splice(idx, 1);
	            }
	            // is newly selected
	            else {
	            	$scope.selection.push(id);
	            }
	        }
	        //Check for all checkbox selection
	        else{
	        	//Check for all checked checkbox for uncheck
	        	if($scope.selection.length > 0 && $scope.selectionAll){
	        		$scope.selection = [];
	        		$scope.checkboxes = {
	        			checked: false,
	        			items:{}
	        		};	
	        		$scope.selectionAll = false;
	        	}
	        	//Check for all un checked checkbox for check
	        	else{
	        		$scope.selectionAll = true
	        		$scope.selection = [];
	        		angular.forEach($scope.simpleList, function(item) {
	        			$scope.checkboxes.items[item._id] = $scope.checkboxes.checked;
	        			$scope.selection.push(item._id);
	        		});
	        	}
	        }
	        console.log($scope.selection)
	    };


	        	//apply global Search
	        	$scope.applyGlobalSearch = function() {
	        		var term = $scope.globalSearchTerm;
	        		if(term != "") {
	        			if($scope.isInvertedSearch) {
	        				term = "!" + term;
	        			}
	        			$scope.tableParams.filter({$ : term});
	        			$scope.tableParams.reload();			
	        		}
	        	}


	        	$scope.getAllPages = function(){
                                //console.log("getAllPages");
	        		cmsService.getPagesList (function(response) {
                                    //console.log(response);
	        			if(response.messageId == 200) {
	        				$scope.filter = {title: '', status : ''};

	        				$scope.tableParams = new ngTableParams({page:1, 						count:10, sorting:{title:"asc"}, filter:$scope.filter}, { total:response.data.length, counts:[], data: response.data});
				//multiple checkboxes
				
				$scope.simpleList = response.data;
				$scope.roleData = response.data;;
				$scope.checkboxes = {
					checked: false,
					items:{}
				};	
			}
		});
	        	}
        
		        $scope.options = {
			language: 'en',
			allowedContent: true,
			entities: false
			};
			$scope.onReady = function () {
    // ... 
			 };
			 
			 
			 
			$scope.findPage = function () {
	        		if ($routeParams.id) {
	        			//console.log('HELL')
	        			cmsService.getPage ($routeParams.id, function(response) {
	        				//console.log(response);
	        				if(response.messageId == 200) {
	        					console.log(response.data)
	        					$scope.user = response.data;
	        				}
	        			});
	        		}
	        		//$scope.getAllRoles()
	        	}
			
			$scope.updateData = function (type) {
				
				if ($scope.user._id) {
					//console.log("Hello");
					var inputJsonString = $scope.user;
					cmsService.updatePage(inputJsonString, $scope.user._id, function(response) {
						if(response.messageId == 200) {
							if(type)
							$location.path( "/cmspages" );
						else{
							++$scope.activeTab
						}
							
						}	
						else{
							$scope.message = err.message;
						} 
					});
				}
				//else{
				//	var inputJsonString = $scope.user;
				//	console.log(inputJsonString)
				//	cmsService.saveUser(inputJsonString, function(response) {
				//		if(response.messageId == 200) {
				//			$scope.message = '';
				//			$routeParams.id = response.data
				//			$scope.user = response.data;
				//			$scope.activeTab = 1;
				//		}	
				//		else{
				//			$scope.message = response.message;
				//		} 
				//	});
				//}
				}

	}]);
	