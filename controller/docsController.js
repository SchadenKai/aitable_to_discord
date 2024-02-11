const DocumentModel = require("../model/documentsModel");

exports.DocsController = {
	research_and_evaluation: async (req, res) => {
		try {
			const parsed_body = new DocumentModel(
				(record_title = req.body.record_title),
				(document_title = req.body.document_title),
				(record_url = req.body.record_url),
				(datasheet_name = req.body.datasheet_name),
				(author = req.body.author)
			);
			const discord_msg = {
                username : parsed_body.author.name,
                avatar_url : parsed_body.author.avatar,
				embeds: [
					{
						title: `:mailbox:   New done document at ${parsed_body.datasheet_name}!`,
						color: 15258703,
						description: `Go check it out here: ${parsed_body.record_url}`,
                        fields : [
                            {
                                name : "Record name",
                                value : parsed_body.record_title
                            },
                            {
                                name : "Document title",
                                value : parsed_body.document_title
                            }
                        ]
					},
				],
			};
			const string_data = JSON.stringify(discord_msg);
			const data = await fetch(process.env.DISCORD_WEBHOOK_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: string_data,
			});
			console.log(data);
			res.send({ message: "Successfully posted to Discord!" });
		} catch (e) {
			console.log(e.message);
			res.send(e.message);
		}
	}
};
