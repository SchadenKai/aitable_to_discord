const Joi = require("joi");

const TaskModel = Joi.object({
	task_name: Joi.string().allow(""),
	epic_title: Joi.string().allow(""),
	member_names: Joi.string().allow(""),
	project_title: Joi.string().allow(""),
	datasheet_name: Joi.string().allow(""),
	details_doc_title: Joi.string().allow(""),
	record_url: Joi.string().uri().allow(""),
	task: Joi.object({
		status: Joi.string().allow(""),
		color: Joi.string().allow(""),
	}),
	project_status: Joi.object({
		name: Joi.string().allow(""),
		color: Joi.string().allow(""),
	}),
	start_date: Joi.string().allow(""),
	end_date: Joi.string().allow(""),
});


module.exports = TaskModel