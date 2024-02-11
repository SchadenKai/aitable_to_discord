class DocumentModel {
  constructor(
    record_title, 
    document_title, 
    record_url, 
    datasheet_name,
    author
    ) { 
        this.record_title = record_title, 
        this.document_title = document_title, 
        this.record_url = record_url,
        this.datasheet_name = datasheet_name
        this.author = author
      }
}

module.exports = DocumentModel
