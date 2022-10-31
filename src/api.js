import JAPI from "jira-client";

export default class JiraApi extends JAPI {
  constructor(args) {
    super({
      protocol: "https",
      apiVersion: "2",
      strictSSL: true,
      ...args,
    });
  }

  async searchByQuery(query, startAt, maxResults) {
    const body = {
      jql: query,
      startAt,
      maxResults,
    };
    return this.doRequest(
      this.makeRequestHeader(
        this.makeUri({
          pathname: `/search`,
        }),
        {
          method: "POST",
          followAllRedirects: true,
          body,
        }
      )
    );
  }
}
