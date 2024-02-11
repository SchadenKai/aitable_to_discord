const functions = require("firebase-functions");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { DocsController } = require("./controller/docsController");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] }));
app.use(helmet());
app.use(bodyParser.json());

app.post("/docs", DocsController.research_and_evaluation)

app.listen(3000, () => {
  console.log("Listening to http://localhost:" + 3000);
});

exports.v1 = functions.https.onRequest(app);
