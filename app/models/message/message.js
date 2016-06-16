var User = require('./../users/users.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

var messageContainerSchema = {
							 	'user_id':{type:String, required: true, ref : 'users' },
							 	'message':{type:String, required: true},
							 	'flag':{type:Boolean, default:false},
							 	'createdDate':{type:Date, default: Date.now()},
							  };

var userIdsSchema = {user_id:{type:String, required: true, ref : 'users' }};

var messagesSchema = new mongoose.Schema({
				 user_ids:[ userIdsSchema ],
				 messages:[ messageContainerSchema ],
                 //flag: {type:Boolean, default:false},
                 status:{type:Boolean, default:true},
                 createdDate:{type:Date, default: Date.now()},
                 modifiedDate:{type:Date, default: Date.now()},
	     });

/**
 * Validation for array Limit
 * @param {Array} 
 * @returns {Bool}  
 */
messagesSchema.path('messages').validate(function(value) {
	  return value.length;
	},"'messages' cannot be an empty array");		

messagesSchema.path('user_ids').validate(function(value) {
	  return ( value.length >= 2 );
	},"'user_ids' must be greater than or equal to two");		




var messageObj = mongoose.model('messages', messagesSchema);


/**
 * Create new message thread
 * @param {Json Object} 
 */
exports.addMessage = function(details, next){
        var message= new messageObj(details);
        message.save(next);
}

/**
 * get user messages thread
 * @param {Json Object} 
 */
exports.findUserMessage = function(userId, messageId, next){

    
    var match = { "_id" : new ObjectId( messageId ), 'user_ids.user_id' : userId };
    var project = {  
                    'message' : '$messages.message',
                    'user_id' : '$messages.user_id',
                    'createdDate' : '$messages.createdDate'
                  };
    var queryCollection =  [{ $match : match },
                            { $unwind:  "$messages" },
                            { $project: project }
                           ];
    messageObj.aggregate( queryCollection,  function(err, data){
        next(null, data);
    });
}

/**
 * get all messages thread
 * @param {Json Object} 
 */
exports.findUserMessages = function(userId, next){
    var match = { 'user_ids.user_id' : userId };

    var group = {
        "_id" : "$_id",
        "message" : { $last : "$messages" },
    };

    var project = {
         "_id" : 1,
         "messages" : 1,
         "modifiedDate" : 1,
    };

    var projectData = {
        "_id": 1,
         "message": 1,
         "modifiedDate": 1,
    };

    var sort = { "modifiedDate" : -1};

    var queryCollection =  [ { $match: match },
                             { $project: project },
                             { $unwind:  "$messages" },
                             { $group: group },
                             { $project: projectData }, 
                             { $sort: sort }];
	messageObj.aggregate( queryCollection,  function(err, data){
          
             if(err) {
                 next(err, {});
             }
             else{
                User.userObj.populate( data, { "path": "message.user_id", select: "firstname" }, function(err,data) {
                    if(err) {
                        next(err, {});
                    }
                    else {
                        next(null, data);
                    }
                });
            }
         })
}

/**
 * add reply to a message thread
 * @param {Json Object} 
 */
exports.replyMessage = function(userId, messageId, data, next){
    var condition = {};
    condition['user_ids.user_id'] = userId;
    condition['_id'] =  messageId;

    var update = {$push: { "messages": data }, $set: { "modifiedDate": Date.now() } };
    messageObj.update( condition, update, {multi : false}, function(err, message ){
        if(err) {
            next(err, {});
        }
        else{
            next(null, message);
        }
    });
}

/**
 * change read status of current user
 * @param {Json Object} 
 */
exports.changeReadStatus = function(userId, messagesId, messageId, next){
    var condition = {};
    condition['_id'] =  messagesId;
    condition['messages._id'] =  new ObjectId(messageId) ;
    var update = {$set: { "messages.$.flag": true }};
    messageObj.update( condition, update, {multi : false}, function(err, message ){
        if(err) {
            next(err, {});
        }
        else{
            next(null, message);
        }
    });
}