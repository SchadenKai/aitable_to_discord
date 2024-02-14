const Joi = require("joi");

const EpicsModel = Joi.object({
    epic_name : Joi.string().allow(""),
    project_list : Joi.string().allow(""),
    description : Joi.string().allow(""),
    status : Joi.string().allow(""),
    start_date : Joi.string().allow(""),
    end_date : Joi.string().allow(""),
    record_url : Joi.string().allow("")
})

module.exports = EpicsModel