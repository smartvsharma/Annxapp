var cmsObj = require('./../../models/cms/cms.js');
var mongoose = require('mongoose');
var constantObj = require('./../../../constants.js');

/**
 * get Cms list
 * @param {Object} req 
 */
	exports.listing = function(req, res){
		cmsObj.findPageList(function(err,data){
		    //console.log('i am in controller');
		if (err) {
		   outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
		}
		else{
		  outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 
	'data': data}
		    
		}
	//console.log(outputJSON);
		res.jsonp(outputJSON);
		});
	}	

	exports.editPage=function(req,res){
			
			if (req.params.id) {
				console.log(req.params.id);
				cmsObj.viewPage({_id:req.params.id},function(err,data){
				if(err) {
				outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
				}
				else {
                                   outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 
                                   'data': data}
				}
					res.jsonp(outputJSON);
                            })
			}

        }
	exports.update=function(req,res){
		if(req.params.id){
			console.log(req.body);return;
			cmsObj.Updatepage(req.params.id,req.body,function(err,data){
				
				console.log("hr");
				if(err) {
					outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
				}
				else {
					outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 
					'data': data}
				}
					res.jsonp(outputJSON);	
				
			})			
			
			
		}
		
	}
