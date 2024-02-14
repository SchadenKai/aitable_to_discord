const Joi = require("joi")

const DocumentModel = Joi.object({
  record_title : Joi.string().allow(""),
  document_title : Joi.string().allow(""),
  record_url : Joi.string().allow(""),
  datasheet_name : Joi.string().allow(""),
  author : Joi.string().allow("")
})

module.exports = DocumentModel
