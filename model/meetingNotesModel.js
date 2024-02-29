const Joi = require("joi")

const MeetingNotesModel = Joi.object({
  record_title : Joi.string().allow(""),
  document_title : Joi.string().allow(""),
  record_url : Joi.string().allow(""),
  datasheet_name : Joi.string().allow(""),
  description : Joi.string().allow(""),
  author : Joi.object({
    name : Joi.string().allow(""),
    avatar : Joi.string().allow("")
  })
})

module.exports = MeetingNotesModel
