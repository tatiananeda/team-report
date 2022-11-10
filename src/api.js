import JAPI from "jira-client";

export default class JiraApi extends JAPI {
  constructor(args) {
    super({
      protocol: "https",
      apiVersion: "3",
      strictSSL: true,
      ...args,
    });
  }

  async doRequest(requestOptions) {
    const options = { ...this.baseOptions, ...requestOptions };

    try {
      const response = await this.request(options);

      if (response) {
        if (
          Array.isArray(response.errorMessages) &&
          response.errorMessages.length > 0
        ) {
          throw new Error(response.errorMessages.join(", "));
        }
      }

      return response;
    } catch (e) {
      throw e;
    }
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
