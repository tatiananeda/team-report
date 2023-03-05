import { join, dirname } from "path";
import writeXlsxFile from "write-excel-file/node";

import { SCHEMA } from "./src/constants.js";
import JiraApi from "./src/api.js";
import DataLoader from "./src/dataLoader.js";

import config from './config.json' assert { type: "json" };

const clientsData = config.map(({ host, username, password, team }) => ({
  client: new JiraApi({ host, username, password }),
  team
}))

async function main() {
  const timeQuery = process.env.TIME_QUERY

  const data = await Promise.all(clientsData.map(({ client, team }) => {
    const loader = new DataLoader(client, team, timeQuery);
    return loader.getFormattedData()
  }))

  await writeXlsxFile(data.flat(), {
    schema: SCHEMA,
    filePath: join(dirname("."), `/results/report_${Date.now()}.xlsx`),
  });
}

main();
