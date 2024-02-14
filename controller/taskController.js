const TaskModel = require("../model/taskModel");

exports.TaskController = {
	validateTask: (req, res, next) => {
		const validated = TaskModel.validate(req.body);
		console.log(validated.warning);
		if (validated.error) {
			throw new Error(validated.error);
		} else {
			console.log("Succesfully validated input!");
			next();
		}
	},
	constructMessage: (req, res, next) => {
		try {
			const temp = {
				username: `AITable: ${req.body.datasheet_name || "N/A"}`,
				avatar_url:
					"https://avatars.githubusercontent.com/u/89725681?s=280&v=4",
				embeds: [
					{
						title: `:pushpin:  Task: ${req.body.task_name}`,
						description: `Learn more about the task here: ${req.body.record_url || "N/A"}.\n ${
							req.body.details_doc_title
								? `There's also a detailed task documentation titled \"${req.body.details_doc_title || "N/A"}\"`
								: ""
						}`,
						fields: [
							{
								name: ":busts_in_silhouette:  Assigned Leads",
								value: req.body.member_names || "N/A",
							},
							{
								name: ":zap:  Epic",
								value: req.body.epic_title || "N/A",
							},
							{
								name: ":computer:  Project",
								value: req.body.project_title || "N/A",
							},
							{
								name: ":date:  Start date",
								value: req.body.start_date || "N/A",
								inline: true,
							},
							{
								name: ":date:  End date",
								value: req.body.end_date || "N/A",
								inline: true,
							},
                            {
                                name : "",
                                value : ""
                            },
							{
								name: "Task status",
								value: req.body.task.status || "N/A",
                                inline: true
							},
							{
								name: "Project status",
								value: req.body.project_status.name || "N/A",
                                inline : true
							},
						],
					},
				]
			};
			req.body = temp;
			next();
		} catch (e) {
			res.send(e.message);
		}
	},
	sendToDiscord: async (req, res) => {
		try {
			const data = await fetch(process.env.DISCORD_PROD_WEBHOOK_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(req.body),
			});
			res.send({ "message ": "Successfully posted to Discord" });
		} catch (e) {
			console.log(e.message);
			res.send(e.message);
		}
	},
};
