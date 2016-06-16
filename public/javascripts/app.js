"use strict";

angular.module("Authentication", []);
angular.module("Home", []);
angular.module("communicationModule", []);
angular.module("Users", []);
angular.module("Roles", []);
angular.module("Permissions", []);
angular.module("cms", []);

var taxiapp = angular.module('taxiapp', ['ngRoute', 'ngStorage', 'ngTable', 'ngResource', 'ui.grid', 'Authentication', 'Home','communicationModule', 'Users', 'Roles','Permissions', 'satellizer','cms','ui.bootstrap','ckeditor'])

.factory('basicAuthenticationInterceptor', function() {
	
	var basicAuthenticationInterceptor = {
		request:function(config) {
			config.headers['Authorization'] = 'Basic ' + appConstants.authorizationKey;
 			config.headers['Content-Type'] = headerConstants.json;
	
			return config;
		}
	};

	return basicAuthenticationInterceptor;
	
})

.config(['$routeProvider', '$httpProvider', '$authProvider', '$locationProvider', function($routeProvider, $httpProvider, $authProvider, $locationProvider) {



	$routeProvider
	.when('/dashboard', {
		controller:'homeController',
		templateUrl:'/modules/home/views/home.html'
	})

	.when('/home', {
		controller:'homeController',
		templateUrl:'/modules/home/views/home.html'
	})

	.when('/', {
		controller:'loginController',
		templateUrl:'/modules/authentication/views/login.html'
	})


	.when('/users', {
		controller : "userController",
		templateUrl : "/modules/users/views/listuser.html"
	})

	.when('/users/add', {
		controller : "userController",
		templateUrl : "/modules/users/views/adduser.html"
	})

	.when('/users/signup', {
		controller : "userController",
		templateUrl : "/modules/users/views/signup.html"
	})

	.when('/users/forgot-password', {
		controller : "loginController",
		templateUrl : "/modules/authentication/views/forgot-password.html"
	})
	.when('/users/reset-password/:id', {
		controller : "loginController",
		templateUrl : "/modules/authentication/views/reset_password.html"
	})
	.when('/users/edit/:id' , {
		controller: "userController",
		templateUrl : "/modules/users/views/adduser.html"
	})
  
  .when('/roles', {
		controller : "roleController",
		templateUrl : "/modules/roles/views/list_role.html"
	})
	.when('/roles/add', {
		controller : "roleController",
		templateUrl : "/modules/roles/views/add_role.html"
	})
	.when('/roles/edit/:roleId', {
		controller : "roleController",
		templateUrl : "/modules/roles/views/add_role.html"
	})
	.when('/permissions', {
		controller : "permissionController",
		templateUrl : "/modules/permissions/views/list_permission.html"
	})
	.when('/permissions/add', {
		controller : "permissionController",
		templateUrl : "/modules/permissions/views/add_permission.html"
	})
	.when('/permissions/edit/:permissionId', {
		controller : "permissionController",
		templateUrl : "/modules/permissions/views/add_permission.html"
	})
	.when('/review', {
		controller : "userController",
		templateUrl : "/modules/users/views/show_review.html"
	})
	.when('/cmspages', {
		controller : "cmsController",
		templateUrl : "/modules/cms/views/pagesView.html"
	})
	.when('/cms/edit/:id', {
		controller : "cmsController",
		templateUrl : "/modules/cms/views/editPage.html"
	})
	.when('/offers', {
		controller : "userController",
		templateUrl : "/modules/users/views/offers.html"
	})
	.when('/offertype', {
		controller : "userController",
		templateUrl : "/modules/users/views/offerType.html"
	})
	.when('/offerlist', {
		controller : "userController",
		templateUrl : "/modules/users/views/offerlist.html"
	})
	.when('/offertypelist', {
		controller : "userController",
		templateUrl : "/modules/users/views/offertypelist.html"
	})
		.when('/addRole', {
		controller : "roleController",
		templateUrl : "/modules/roles/views/add_role.html"
	})
			.when('/roletype', {
		controller : "roleController",
		templateUrl : "/modules/roles/views/list_role.html"
	})

	/*.when('/categories' , {
		controller: "categoryController",
		templateUrl:"/modules/categories/views/listcategory.html"
	})

	.when('/categories/add' , {
		controller: "categoryController",
		templateUrl:"/modules/categories/views/addcategory.html"
	})

	.when('/categories/editcategory/:categoryId', {
		controller:"categoryController",
		templateUrl:"/modules/categories/views/addcategory.html"
	})

	.when('/categories/listquestions/:categoryId' , {
		controller : "categoryController",
		templateUrl : "/modules/categories/views/listquestions.html"
	})


	
	.when('/questionnaire', {
		controller : "questionnaireController",
		templateUrl : "/modules/questionnaire/views/listquestionnaire.html"
	})

	.when('/questionnaire/add', {
		controller : "questionnaireController",
		templateUrl : "/modules/questionnaire/views/addquestionnaire.html"
	})

	.when('/viewcategories/:questionnaireID', {
		controller: "questionnaireController",
		templateUrl: "/modules/questionnaire/views/listcategories.html"
	})

	.when('/viewcategoryquestions/:catquestionnaireID', {
		controller : "questionnaireController",
		templateUrl : "/modules/questionnaire/views/listquestions.html"
	})

	.when('/questionnaire/edit/:questionnarieId', {
		controller : "questionnaireController",
		templateUrl : "/modules/questionnaire/views/addquestionnaire.html"
	})	

	.when('/questions/add/:categoryId' , {
		controller : "questionController",
		templateUrl : "/modules/questions/views/addquestion.html"
	})

	.when('/questions/editquestion/:questionId', {
		controller : "questionController",
		templateUrl : "/modules/questions/views/addquestion.html"
	})*/

	.otherwise({
		redirectTo:'/'
	});

	//to remove the # from the URL
	//$locationProvider.html5Mode({enabled : true, requireBase : false});
}])

.run(['$rootScope', '$location', '$http', '$localStorage', function($rootScope, $location, $http, $localStorage) {

	if(!$localStorage.userLoggedIn) {
		$location.path('/');
	}
}]);
