import * as dotenv from "dotenv";
import { join, dirname } from "path";
import writeXlsxFile from "write-excel-file/node";

import { SCHEMA } from "./src/constants.js";
import JiraApi from "./src/api.js";
import DataLoader from "./src/dataLoader.js";

dotenv.config();

const teamData = [
  {
    client: new JiraApi({
      host: process.env.JIRA_HOST_1,
      username: process.env.JIRA_USERNAME_1,
      password: process.env.JIRA_PASSWORD_1,
    }),
    team: JSON.parse(process.env.TEAM_1)
  }
]

async function main() {
  const timeQuery = process.env.TIME_QUERY

  const data = await Promise.all(teamData.map(({ client, team }) => {
    const loader = new DataLoader(client, team, timeQuery);
    return loader.getFormattedData()
  }))

  await writeXlsxFile(data.flat(), {
    schema: SCHEMA,
    filePath: join(dirname("."), `/results/report_${Date.now()}.xlsx`),
  });
}

main();
