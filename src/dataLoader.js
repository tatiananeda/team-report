import { STATUS_TO_REPORT } from "./constants.js";

export default class DataLoader {
  #client;
  #team;
  #timeQuery;

  constructor(client, team, timeQuery) {
    this.#client = client;
    this.#team = team;
    this.#timeQuery = timeQuery || "sprint in openSprints ()";
  }

  #getData = async ({ id, kanban }) => {
    let query = ''

    if (!kanban) {
      query  = `("Developer[User Picker (single user)]"=${id} OR assignee=${id}) AND ${this.#timeQuery}`
    } else {
      query = `("Developer[User Picker (single user)]"=${id} OR assignee=${id})`
    }
    
    let allIssues = [];
    let start = 0;
    let toFetch = false;
    try {
      do {
        const data = await this.#client.searchByQuery(query, start);

        if (data?.issues) allIssues = [...allIssues, ...data.issues];

        const fetched = allIssues.length;
        if (fetched < data?.total) {
          start = fetched;
          toFetch = true;
        } else {
          toFetch = false;
        }
      } while (toFetch);
    } catch (e) {
      console.log(e);
      process.exit(1);
    }

    return allIssues;
  };

  getFormattedData = async () => {
    try {
      const teamPairs = Object.entries(this.#team);
      const data = await Promise.all(
        teamPairs.map(([_name, user]) => this.#getData(user))
      );

      const dataRows = data.map((byUser, idx) => {
        const buckets = Object.fromEntries(
          STATUS_TO_REPORT.map((column) => [column.toLowerCase(), []])
        );

        buckets.other = [];

        byUser.forEach((ticket) => {
          const status = ticket?.fields?.status?.name?.toLowerCase();
          if (buckets[status]) buckets[status].push(ticket.key);
          else buckets.other.push(`${ticket.key} - ${ticket.fields.status.name}`);
        });

        buckets.name = teamPairs[idx][0];

        return buckets;
      });

      return dataRows;
    } catch (e) {
      console.log(e);
    }
  };
}
