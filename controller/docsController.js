const DocumentModel = require("../model/documentsModel");
const MeetingNotesModel = require("../model/meetingNotesModel");

exports.DocsController = {
	research_and_evaluation: async (req, res) => {
		try {
			const validated = DocumentModel.validate(req.body);
			if (validated.error) {
				throw new Error(validated.error);
			}
			console.log("Successfully validated the input!");
			const discord_msg = {
				username: validated.value.author.name,
				avatar_url: validated.value.author.avatar,
				embeds: [
					{
						title: `:mailbox:   New done document at ${validated.value.datasheet_name}!`,
						color: 15258703,
						description: `Go check it out here: ${validated.value.record_url}`,
						fields: [
							{
								name: "Record name",
								value: validated.value.record_title,
							},
							{
								name: "Document title",
								value: validated.value.document_title,
							},
						],
					},
				],
			};
			const string_data = JSON.stringify(discord_msg);
			const data = await fetch(
				process.env.DISCORD_PROD_WEBHOOK_DOCS_URL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: string_data,
				}
			);
			console.log(data.statusText);
			res.send({ message: "Successfully posted to Discord!" });
		} catch (e) {
			console.log(e.message);
			res.send(e.message);
		}
	},
	meeting_notes: async (req, res) => {
		try {
			const validated = MeetingNotesModel.validate(req.body);
			if (validated.error) {
				throw new Error(validated.error);
			}
			console.log("Successfully validated the input!");
			const discord_msg = {
				username: validated.value.author.name,
				avatar_url: validated.value.author.avatar,
				embeds: [
					{
						title: `:mailbox:   New done document at ${validated.value.datasheet_name}!`,
						color: 15258703,
						description:
							validated.value.description ||
							`Go check it out here: ${validated.value.record_url}`,
						fields: [
							{
								name: "Record name",
								value: validated.value.record_title,
							},
							{
								name: "Document title",
								value: validated.value.document_title,
							},
						],
						footer: {
							text: `Go check it out here: ${validated.value.record_url}`,
						},
					},
				],
			};
			const string_data = JSON.stringify(discord_msg);
			const data = await fetch(
				process.env.DISCORD_PROD_WEBHOOK_DOCS_URL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: string_data,
				}
			);
			console.log(data.statusText);
			res.send({ message: "Successfully posted to Discord!" });
		} catch (e) {
			console.log(e.message);
			res.send(e.message);
		}
	},
};
