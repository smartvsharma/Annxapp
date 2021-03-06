"use strict";

angular.module("Roles")

taxiapp.controller("roleController", ['$scope', '$rootScope', '$localStorage',  'roleService',
	'PermissionService', 'ngTableParams', '$routeParams', '$route', '$location',"$timeout", function($scope, $rootScope, $localStorage,
		roleService, PermissionService, ngTableParams, $routeParams, $route, $location,$timeout){

		if($localStorage.userLoggedIn) {
			$rootScope.userLoggedIn = true;
			$rootScope.loggedInUser = $localStorage.loggedInUsername;
		}
		else {
			$rootScope.userLoggedIn = false;
		}

		

	//empty the $scope.message so the field gets reset once the message is displayed.
	$scope.message = "";

	//Toggle multilpe checkbox selection
	$scope.selection = [];
	$scope.selectionAll;
	$scope.roleValue = 1;
/*	$scope.toggleSelection = function toggleSelection(id) {
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


        	$scope.getAllRoles = function(){
        		RoleService.getRoleList (function(response) {
        			if(response.messageId == 200) {
        				$scope.filter = {name: '', enable: true};
        				$scope.tableParams = new ngTableParams({page:1, count:10, sorting:{name:"asc"}, filter:$scope.filter}, { total:response.data.length, counts:[], data: response.data});

			//multiple checkboxes
			
			$scope.simpleList = response.data;
			$scope.roleData = response.data;
			$scope.checkboxes = {
				checked: false,
				items:{}
			};	
}
});
}
$scope.activeTab = 0;
$scope.findOne = function () {
if ($routeParams.roleId) {
	RoleService.getRole ($routeParams.roleId, function(response) {
		console.log(response);
		if(response.messageId == 200) {
			$scope.role = response.data;
		}
	});
}
$scope.getAllPermission()
}

$scope.getAllPermission = function(){
PermissionService.getPermissionList (function(response) {
	if(response.messageId == 200) {
		var len =  response.data.length;
		var rolePermissionlen = $scope.role.permission.length;
		for( var i =0 ; i< len ; i++){
			if(($scope.role.permission.indexOf(response.data[i]._id)) == -1)
				response.data[i].used = false;
			else
				response.data[i].used = true;
		}
		$scope.permissionData = response.data;
	}
});
}

$scope.checkStatus = function (yesNo) {
if (yesNo)
	return "pickedEven";
else
	return "";
}

$scope.moveTabContents = function(tab){
$scope.activeTab = tab;
}

$scope.editPermission = function (id) {
var index = $scope.role.permission.indexOf(id);
if(index == -1)	
	$scope.role.permission.push(id)
else
	$scope.role.permission.splice(index, 1)
for (var a = 0; a < $scope.permissionData.length; ++a) {
	if ($scope.permissionData[a]._id == id) {
		if ($scope.permissionData[a].used) {
			$scope.permissionData[a].used = false;
		} else {
			$scope.permissionData[a].used = true;
		}
		break;
	}
}
if($scope.role.permission.length > 0)
	$scope.role.enable = true;
else
	$scope.role.enable = false;
console.log($scope.role.permission);
}

//perform action
$scope.performAction = function() {						
var roleLength =  $scope.selection.length;
var updatedData = [];
$scope.selectedAction = selectedAction.value;
if($scope.selectedAction == 0)
$scope.message = messagesConstants.selectAction;
else{	
for(var i = 0; i< roleLength; i++){
	var id =  $scope.selection[i];
	  if($scope.selectedAction == 3) {
	  updatedData.push({id: id, is_deleted: true});
	}
	else if($scope.selectedAction == 1) {
		updatedData.push({id: id, enable: true});
	}
	else if($scope.selectedAction == 2) {
		updatedData.push({id: id, enable: false});
	}
}
var inputJson = {data: updatedData}
	RoleService.updateRoleStatus(inputJson, function(response) {
		$rootScope.message = messagesConstants.updateStatus;
		$route.reload();
	});
}
}*/
  $scope.error = $rootScope.error;
        $timeout(function () { 
          $scope.error = false; 
          $rootScope.error = false; 
        }, 2000);

$scope.addrole= function(){console.log("in coon"+JSON.stringify($scope.role));

	var details= [];
	details.role=$scope.role;
	  details.created_date = new Date;

	  console.log(JSON.stringify(details)+"///////")

	roleService.roletype(details,function(response){console.log(JSON.stringify(response)+"---------")
		var errorMessage = '';
            if(response.messageId == 401) {
              $scope.error = response.message;
              $timeout(function () { $scope.error = false;}, 2000);
            }else if(response.messageId == 200) {
              $rootScope.error = response.message;
               $timeout(function () {$scope.error = false;}, 2000);
              //$scope.offer_name="";
			 $location.path("/roletype");
             
            }
	}) 
}

$scope.roleviews=function(){ 
        	   var jsondata = {"offer":"all"};

          		roleService.roleviews(jsondata, function(response){
            	        $scope.reviews = response 
            	        console.log($scope.reviews )
        		})
    }
$scope.confirm = function(appId){
          var input = confirm('Are you sure to delete this Offer?');
          if(input == true){
            roleService.deleterole(appId,function(response) {
              if(response.status == 200) {
                $scope.error = response.message;
                $scope.errornew = response.message;
                $timeout(function () { $scope.scope = false; $route.reload();}, 3000);
              }
            });
          }
          
        }


}]);