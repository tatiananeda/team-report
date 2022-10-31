import * as dotenv from "dotenv";
import JiraApi from "./src/api.js";
import Report from "./src/report.js";

dotenv.config();

const client = new JiraApi({
  host: process.env.JIRA_HOST,
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_PASSWORD,
});

const report = new Report(
  client,
  JSON.parse(process.env.TEAM),
  process.env.TIME_QUERY
  );
  
report.make();
