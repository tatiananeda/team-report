import { join, dirname } from "path";
import writeXlsxFile from "write-excel-file/node";
import { SCHEMA, STATUS_TO_REPORT } from "./constants.js";

export default class Report {
  #client;
  #team;
  #timeQuery;

  constructor(client, team, timeQuery) {
    this.#client = client;
    this.#team = team;
    this.#timeQuery = timeQuery || "sprint in openSprints ()";
  }

  async make() {
    try {
      const dataRows = await this.#getFormattedData();
      await writeXlsxFile(dataRows, {
        schema: SCHEMA,
        filePath: join(dirname(".."), `/results/report_${Date.now()}.xlsx`),
      });
    } catch (err) {
      console.error(err);
    }
  }

  #getData = async (userId) => {
    let allIssues = [];
    let start = 0;
    let toFetch = false;

    do {
      const data = await this.#client.searchByQuery(
        `("Developer[User Picker (single user)]"=${userId} OR assignee=${userId}) AND ${
          this.#timeQuery
        }`,
        start
      );

      if (data?.issues) allIssues = [...allIssues, ...data.issues];

      const fetched = allIssues.length;
      if (fetched < data?.total) {
        start = fetched;
        toFetch = true;
      } else {
        toFetch = false;
      }
    } while (toFetch);

    return allIssues;
  };

  #getFormattedData = async () => {
    const teamPairs = Object.entries(this.#team);
    const data = await Promise.all(
      teamPairs.map(([_name, id]) => this.#getData(id))
    );

    const dataRows = data.map((byUser, idx) => {
      const buckets = Object.fromEntries(
        STATUS_TO_REPORT.map((column) => [column, []])
      );

      buckets.other = [];

      byUser.forEach((ticket) => {
        const status = ticket?.fields?.status?.name;
        if (buckets[status]) buckets[status].push(ticket.key);
        else buckets.other.push(`${ticket.key} - ${status}`);
      });

      buckets.name = teamPairs[idx][0];

      return buckets;
    });

    return dataRows;
  };
}
