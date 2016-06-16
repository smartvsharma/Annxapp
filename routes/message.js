module.exports = function(app, express, passport) {
	var router = express.Router();	
	var messageObj = require('./../app/controllers/messages/messages.js');
	router.post('/list',messageObj.messageList);
	router.post('/message_data',messageObj.messageData);
	router.post('/send',messageObj.sendMessage);
	router.post('/reply',messageObj.replyMessage);
	router.post('/change_state',messageObj.changeStateMessage);
    app.use('/users/message', router);
}
