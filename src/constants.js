const defaults = {
  type: String,
  align: "center",
  alignVertical: "center",
  wrap: true,
  width: 20,
};

export const STATUS_TO_REPORT = [
  "In Development",
  "Review",
  "DevTest",
  "QA",
  "Needs RC",
  "Blocked",
  "Done",
  "Peer Review",
  "Ready for QA",
  "Ready for Demo",
  "In QA",
  "Demo",
  "In Progress",
  "other",
];

export const SCHEMA = [
  {
    column: "Name",
    value: (obj) => obj.name,
    ...defaults,
  },
  {
    column: "In Development",
    value: (obj) => [...obj["in development"], ...obj['in progress']].join(", "),
    ...defaults,
  },
  {
    column: "Review",
    value: (obj) => [...obj.review, ...obj['peer review']].join(", "),
    ...defaults,
  },
  {
    column: "DevTest",
    value: (obj) => obj.devtest.join(", "),
    ...defaults,
  },
  {
    column: "QA",
    value: (obj) => [
      ...obj.qa, ...obj.demo, ...obj['in qa'], ...obj['ready for qa'], ...obj['ready for demo']
    ].join(", "),
    ...defaults,
  },
  {
    column: "Needs RC",
    value: (obj) => obj["needs rc"].join(", "),
    ...defaults,
  },
  {
    column: "Blocked",
    value: (obj) => obj.blocked.join(", "),
    ...defaults,
  },
  {
    column: "Done",
    value: (obj) => obj.done.join(", "),
    ...defaults,
  },
  {
    column: "Other",
    value: (obj) => obj.other.join(", "),
    ...defaults,
  },
];
