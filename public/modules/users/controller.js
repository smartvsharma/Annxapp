	"use strict";

	angular.module("Users")

	taxiapp.controller("userController", ['$scope', '$rootScope', '$localStorage', 'UserService','roleService', 'ngTableParams', '$routeParams', '$route','$location','$timeout',  function($scope, $rootScope, $localStorage, UserService, roleService, ngTableParams, $routeParams, $route, $location,$timeout){

		
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

	 $scope.today = function() {
    $scope.start_date = new Date();
    $scope.valid_date = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.start_date = null;
    $scope.valid_date = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.start_date = new Date(year, month, day);
     $scope.valid_date = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

 $scope.popup1 = { opened : false}
 $scope.popup2 = { opened : false}


  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
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


	        	$scope.getAllUsers = function(){
	        		UserService.getUserList (function(response) {
	        			if(response.messageId == 200) {
	        				$scope.filter = {firstname: '', lastname : '', email : ''};

	        				$scope.tableParams = new ngTableParams({page:1, count:10, sorting:{firstname:"asc"}, filter:$scope.filter}, { total:response.data.length, counts:[], data: response.data});
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

	        	$scope.getAllRoles = function(){
						RoleService.getRoleList (function(response) {
							if(response.messageId == 200) {
								var len =  response.data.length;
								var rolePermissionlen = $scope.user.role.length;
								for( var i =0 ; i< len ; i++){
									if(($scope.user.role.indexOf(response.data[i]._id)) == -1)
										response.data[i].used = false;
									else
										response.data[i].used = true;
								}
								$scope.roleData = response.data;
								console.log('permission', $scope.roleData);
							}
						});
						}
	        	$scope.activeTab = 0;
	        	$scope.findOne = function () {
	        		if ($routeParams.id) {
	        			//console.log('HELL')
	        			UserService.getUser ($routeParams.id, function(response) {
	        				console.log(response);
	        				if(response.messageId == 200) {
	        					console.log(response.data)
	        					$scope.user = response.data;
	        				}
	        			});
	        		}
	        		$scope.getUserType()
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

				$scope.selectRole = function (id) {
				var index = $scope.user.role.indexOf(id);
				if(index == -1)	
					$scope.user.role.push(id)
				else
					$scope.user.role.splice(index, 1)

				var roleLen = $scope.roleData.length;
				for (var a = 0; a < roleLen; ++a) {
					if ($scope.roleData[a]._id == id) {
						if ($scope.roleData[a].used) {
							$scope.roleData[a].used = false;
						} else {
							$scope.roleData[a].used = true;
						}
						break;
					}
				}
				
				console.log($scope.user.role);
				}


				$scope.updateData = function (type) { console.log("")
				if ($scope.user._id) {
					console.log($scope.user);
					var inputJsonString = $scope.user;
					UserService.updateUser(inputJsonString, $scope.user._id, function(response) {
						if(response.messageId == 200) {
							if(type)
							$location.path( "/users" );
						else{
							++$scope.activeTab
						}
							
						}	
						else{
							$scope.message = err.message;
						} 
					});
				}
				else{
					var inputJsonString = $scope.user;
					console.log(inputJsonString)
					UserService.saveUser(inputJsonString, function(response) {
						if(response.messageId == 200) {
							$scope.message = '';
							$routeParams.id = response.data
							$scope.user = response.data;
							$scope.activeTab = 1;
						}	
						else{
							$scope.message = response.message;
						} 
					});
				}
				}				
		//perform action
		$scope.performAction = function() {						
		var roleLength =  $scope.selection.length;
		console.log(roleLength);
		var updatedData = [];
		$scope.selectedAction = selectedAction.value;
		console.log($scope.selectedAction);
		console.log($scope.selection);
		if($scope.selectedAction == 0)
		$scope.message = messagesConstants.selectAction;
		else{	
		for(var i = 0; i< roleLength; i++){
			var id =  $scope.selection[i];
			  if($scope.selectedAction == 3) {
			  updatedData.push({id: id, is_deleted: true});
			}
			else if($scope.selectedAction == 1) {
				updatedData.push({id: id, status: true});
			}
			else if($scope.selectedAction == 2) {
				updatedData.push({id: id, status: false});
			}
		}
		var inputJson = {data: updatedData}
			UserService.updateUserStatus(inputJson, function(response) {
				$rootScope.message = messagesConstants.updateStatus;
				$route.reload();
			});
		}
		}
		
		//perform action
		
		$scope.performAction1 = function() {
			var data = $scope.checkboxes.items;	
			var records = [];
			var inputJsonString = "";
			var jsonString = "";

			var actionToPerform = "";
			
			$scope.selectAction = selectAction.value;

			if($scope.selectAction == "disable") {
				actionToPerform = false;
			}
			else if($scope.selectAction == "enable") {
				actionToPerform = true;
			}
			else if($scope.selectAction == "delete") {

				actionToPerform = "delete";
			}

			//console.log("data=", data);

			for(var id in data) {
				if(data[id]) {
					if(actionToPerform == "delete") {
						if(jsonString == "") {

							jsonString = '{"_id": "' + id + '", "is_deleted":"true"}';	
						}
						else {
							jsonString = jsonString + "," + '{"_id": "' + id + '", "is_deleted":"true"}';
						}
					}
					else {
						if(jsonString == "") {

							jsonString = '{"_id": "' + id + '", "enable":"' + actionToPerform + '"}';	
						}
						else {
							jsonString = jsonString + "," + '{"_id": "' + id + '", "enable":"' + actionToPerform + '"}';
						}
					}
				}
				
			}

			inputJsonString = "[" + jsonString + "]";

			if(actionToPerform == "delete") {
				
				UserService.deleteUser(inputJsonString, function(response) {
					$rootScope.message = messagesConstants.deleteUser;
					$route.reload();	
				});
			}
			else {
				UserService.statusUpdateUser(inputJsonString, function(response) {
					$rootScope.message = messagesConstants.updateStatus;
					$route.reload();
				});
			}

		}

	$scope.addUser=function(){
		console.log($scope.username);
		
	}
	
	$scope.listreviews=function(){ console.log("constroller")
        	   var jsondata = {"hostid":"all"};

          		UserService.listreviews(jsondata, function(response){
            	        $scope.reviews = response.reviews; 
        		})
    }
 $scope.error = $rootScope.error;
 $timeout(function () { 
 $scope.error = false; 
 $rootScope.error = false; }, 2000);

$scope.addoffer = function()
{
	var details = [];
	details.coupon_name=$scope.offertype;
	details.title=$scope.title;
	details.category_id=$scope.category_id;

	 var reqTempTODate=new Date($scope.start_date).getTime()
     var newreqTempToDate=reqTempTODate+(330*60*1000);
     console.log(newreqTempToDate);
     details.start_date= newreqTempToDate;

     var reqTempTODate1=new Date($scope.valid_date).getTime()
     var newreqTempToDate1=reqTempTODate1+(330*60*1000);
     details. valid_date= newreqTempToDate1;
     
     details.createdDate = new Date;
	 details.modifiedDate = new Date;
	 console.log("/////"+details)
	 UserService.addoffer(details,function(response){console.log(response)
	 	var errorMessage = '';
            if(response.messageId == 401) {
              $scope.error = response.message;
              $timeout(function () { $scope.error = false;}, 2000);
            }else if(response.messageId == 200) {
              $rootScope.error = response.message;
               $timeout(function () {$scope.error = false;}, 2000);
              $scope.offertype="";
			      $location.path("/offerlist");
               
            }
	 })
}
$scope.addoffertype=function()
{
	var details= [];
	details.offer_name=$scope.title;
	UserService.offertype(details,function(response){
		var errorMessage = '';
            if(response.messageId == 401) {
              $scope.error = response.message;
              $timeout(function () { $scope.error = false;}, 2000);
            }else if(response.messageId == 200) {
              $rootScope.error = response.message;
               $timeout(function () {$scope.error = false;}, 2000);
              //$scope.offer_name="";
			            $location.path("/offertypelist");
              //$route.reload();
            }
	}) 
}

$scope.offerviews=function(){ 
        	   var jsondata = {"offer":"all"};
          		UserService.offerviews(jsondata, function(response){
            	        $scope.reviews = response 
            	        console.log($scope.reviews )
        		})
    }
    $scope.offerlist=function(){ console.log("constroller")
        	   var jsondata = {"offer":"all"};

          		UserService.offerlist(jsondata, function(response){
          			
            	        $scope.offer = response;
        		})
    }

     $scope.confirm = function(appId){ 
          var input = confirm('Are you sure to delete this OfferType?');
          if(input == true){
            UserService.deleteoffer(appId,function(response) {
              if(response.status == 200) {
                $scope.error = response.message;
                $scope.errornew = response.message;
				$scope.offerviews();
                //$timeout(function () { $scope.scope = false; $route.reload();}, 3000);
              }
            });
          }
          
        }
		
     $scope.confirm12 = function(appId){ 
          var input = confirm('Are you sure to delete this Offer?');
          if(input == true){
            UserService.deleteofferdetail(appId,function(response) {
              if(response.status == 200) {
                //$scope.error = response.message;
                $scope.errornew = response.message;
				console.log($scope.errornew)
               $scope.offerlist();
              }
            });
          }
          
        }
	$scope.getUserType = function(){
        	 var jsondata = {"offer":"all"};

          		UserService.roleviews(jsondata, function(response){
            	        $scope.getusertype = response 
            	     
        		})

        }

	}]);
	