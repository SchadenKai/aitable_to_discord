const EpicsModel = require("../model/epicsModel")


exports.EpicsController = {
    epic_creation : async (req, res) => {
        try {
            const validated = EpicsModel.validate(req.body)
            if(validated.error) {
                throw new Error(validated.error)
            }
            console.log("Successfully validated input!");
            const message = {
                username: `AITable: ${req.body.datasheet_name || "N/A"}`,
				avatar_url: "https://avatars.githubusercontent.com/u/89725681?s=280&v=4",
                embeds: [
                    {
                        title : `:zap: Epic: ${validated.value.epic_name}`,
                        url : validated.value.record_url,
                        description : validated.value.description,
                        fields : [
                            {
                                name : "Project List",
                                value : validated.value.project_list || "N/A"
                            },
                            {
                                name : "Epic Status",
                                value : validated.value.status || "N/A"
                            },
                            {
                                name : "Start date",
                                value : validated.value.start_date || "N/A",
                                inline : true
                            },
                            {
                                name : "End date",
                                value : validated.value.end_date || "N/A",
                                inline : true
                            }
                        ]
                    }
                ]
            }
            const data = await fetch(process.env.DISCORD_PROD_WEBHOOK_TASKS_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(message),
			});
            console.log(data.statusText)
            console.log("Successfully posted on Discord!")
			res.send({ "message ": "Successfully posted to Discord" });
        } catch (e) {
            console.log(e.message)
            res.send(e.message)
        }
        
    }
}