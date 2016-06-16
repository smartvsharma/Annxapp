var messageObj = require('./../../models/message/message.js');
var mongoose = require('mongoose');
var constantObj = require('./../../../constants.js');
var nodemailer = require('nodemailer');

/**
 * get messages list
 * @param {Object} req 
 */
exports.messageList = function(req, res){
	var userID = req.body.id;
	messageObj.findUserMessages(userID, function(err, data) {
		var errMessage = '';
    	var messages = '';
    	if(err){
    		for (var errName in err.errors) {
				errMessage += err.errors[errName].message + "\n";
			}
			messages += errMessage;
   			res.jsonp({'status':'faliure', 'messageId':401, 'message':messages});
   		}
   		else{
	 		res.jsonp({'status':'success', 'messageId':200, 'message':'Message is successfully sent',"message":data});
   		}
	});
}


/**
 * get message thread
 * @param {Object} req 
 */
exports.messageData = function(req, res){
    var userID = req.body.id;
    var messagesID = req.body.thread_id;
	messageObj.findUserMessage(userID, messagesID, function(err, data) {
		var errMessage = '';
    	var messages = '';
    	if(err){
    		for (var errName in err.errors) {
				errMessage += err.errors[errName].message + "\n";
			}
			messages += errMessage;
   			res.jsonp({'status':'faliure', 'messageId':401, 'message':messages});
   		}
   		else{
	 		res.jsonp({'status':'success', 'messageId':200, 'message':'Message is successfully sent',"message":data});
   		}
	});
}

/**
 * send message 
 * @param {Object} req 
 */
exports.sendMessage = function(req, res){
	var detail = {};
	var user_ids = [
						{'user_id': req.body.from_user_id},
						{'user_id': req.body.to_user_id},
					];
	var message = [{
		'user_id': req.body.from_user_id,
		'message': req.body.message,
		 }];
	detail.user_ids = user_ids;
	detail.messages = message;
    messageObj.addMessage(detail, function(err, data) {
    	var errMessage = '';
    	var messages = '';
    	if(err){
    		for (var errName in err.errors) {
				errMessage += err.errors[errName].message + "\n";
			}
			messages += errMessage;
   			res.jsonp({'status':'faliure', 'messageId':401, 'message':messages});
   		}
   		else{
	 		res.jsonp({'status':'success', 'messageId':200, 'message':'Message is successfully sent',"message":data});
   		}
    });
}

/**
 * reply message 
 * @param {Object} req 
 */
exports.replyMessage = function(req, res){
	var user_id = req.body.id;
	var messageID = req.body.thread_id;
	var message = {
		'user_id': user_id,
		'message': req.body.message,
		 };
	messageObj.replyMessage(user_id, messageID, message, function(err, data) {
		var errMessage = '';
    	var messages = '';
    	if(err){
    		for (var errName in err.errors) {
				errMessage += err.errors[errName].message + "\n";
			}
			messages += errMessage;
   			res.jsonp({'status':'faliure', 'messageId':401, 'message':messages});
   		}
   		else{
	 		res.jsonp({'status':'success', 'messageId':200, 'message':'Message is successfully sent'});
   		}
	});
      
}

/**
 * change message read  status
 * @param {Object} req 
 */
exports.changeStateMessage = function(req, res){
	var user_id = req.body.id;
	var messagesID = req.body.thread_id;
	var messageID = req.body.message_id;
	messageObj.changeReadStatus(user_id, messagesID,  messageID,  function(err, data) {
		var errMessage = '';
    	var messages = '';
    	if(err){
    		for (var errName in err.errors) {
				errMessage += err.errors[errName].message + "\n";
			}
			messages += errMessage;
   			res.jsonp({'status':'faliure', 'messageId':401, 'message':messages});
   		}
   		else{
	 		res.jsonp({'status':'success', 'messageId':200, 'message':'Message is successfully sent'});
   		}
	});
}

