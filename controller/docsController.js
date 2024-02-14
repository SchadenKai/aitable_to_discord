const DocumentModel = require("../model/documentsModel");

exports.DocsController = {
	research_and_evaluation: async (req, res) => {
		try {
			const validated = DocumentModel.validate(req.body)
			if (validated.error) {
				throw new Error(validated.error)
			}
			const discord_msg = {
                username : validated.author.name,
                avatar_url : validated.author.avatar,
				embeds: [
					{
						title: `:mailbox:   New done document at ${validated.datasheet_name}!`,
						color: 15258703,
						description: `Go check it out here: ${validated.record_url}`,
                        fields : [
                            {
                                name : "Record name",
                                value : validated.record_title
                            },
                            {
                                name : "Document title",
                                value : validated.document_title
                            }
                        ]
					},
				],
			};
			const string_data = JSON.stringify(discord_msg);
			const data = await fetch(process.env.DISCORD_PROD_WEBHOOK_DOCS_URL, {
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
