var baseUrl = "http://localhost:5006";
//var baseUrl = "http://192.155.246.146:5006";

var webservices = {	

	"authenticate" : baseUrl + "/adminlogin/authenticate",
	//"userAuthenticate" : baseUrl + "/userLogin/authenticate",
	//user
	"addUser" : baseUrl + "/users/add",
	"userList" : baseUrl + "/users/list",
	"findOneUser" : baseUrl + "/users/userOne",
	"bulkUpdateUser" : baseUrl + "/users/bulkUpdate",
	"update" : baseUrl + "/users/update",
	"listreviews" : baseUrl+"/users/hostrating",
	"addoffer":baseUrl+"/users/addoffer",
	"offertype":baseUrl+"/users/offertype",
	"offerviews":baseUrl+"/users/offerviews",
	"offerlist": baseUrl+ "/users/offerlist",
	"deleteoffer": baseUrl+ "/users/deleteoffer",
	"deleteofferdetails": baseUrl+ "/users/deleteofferdetails",
	
	"forgot_password":baseUrl + "/adminlogin/forgot_password",
	"reset_password":baseUrl + "/adminlogin/reset_password",
	
	//category
	"allQuestions" : baseUrl + "/categories/allQuestions",
	"categoryList" : baseUrl + "/categories/list",
	"addCategory" : baseUrl + "/categories/add",
	"updateCategory" : baseUrl + "/categories/update",
	"bulkUpdateCategory" : baseUrl + "/categories/bulkUpdate",
	"findOne" : baseUrl + "/categories/findOne",
	
  	//role
	"getuserType" : baseUrl+"/users/getuserType",
	"roleList" : baseUrl + "/roles/list",
	"addRole" : baseUrl + "/roles/add",
	"updateRole" : baseUrl + "/roles/update",
	"findOneRole" : baseUrl + "/roles/role",
	"bulkUpdateRole" : baseUrl + "/roles/bulkUpdate",
	"roletype" : baseUrl + "/roles/roletype",
	"roleviews" : baseUrl + "/roles/roleviews",
	"deleterole" : baseUrl + "/roles/deleterole",
	//permission
	"permissionList" : baseUrl + "/permissions/list",
	"createPermission" : baseUrl + "/permissions/create",
	"updatePermission" : baseUrl + "/permissions/update",
	"findOnePermission" : baseUrl + "/permissions/permission",
	"bulkUpdatePermission" : baseUrl + "/permissions/bulkUpdate",
	
	//custom pages
	"pageList":baseUrl+"/cms/listing",
	"findPage":baseUrl+"/cms/editPage",
	"update":baseUrl + "/cms/update"
}


var appConstants = {

	"authorizationKey": "dGF4aTphcHBsaWNhdGlvbg=="	
}


var headerConstants = {

	"json": "application/json"

}

var pagingConstants = {
	"defaultPageSize": 10,
	"defaultPageNumber":1
}

var messagesConstants = {

	//users
	"saveUser" : "User saved successfully",
	"updateUser" : "User updated successfully",
	"updateStatus" : "Status updated successfully",
	"deleteUser": "User(s) deleted successfully"
}