# Report
## Description
This is a package that automates creation of jira based team report in a format of SS-Y team.
## Usage
1. Install [NodeJS](https://nodejs.org/en/download/) >= 16.
2. Run `npm ci`.
3. Run `cp .env.template .env` and update the contents of newly created `.env` file with proper values for: `JIRA_HOST`, `JIRA_USERNAME` and `JIRA_PASSWORD` that represent string credentials to access Jira API; `TEAM` variable must be a valid JSON string representing an object where name of the team member is a key and Jira id of the team member is a value. Default behavior of the class is to create report for the active sprint. To change this default behavior set `TIME_QUERY` to valid JQL condition specifying alternative timeframe.
4. Run `npm start`. When program gets executed `report_<timestapm>.xlsx` will be created in `results` folder.
