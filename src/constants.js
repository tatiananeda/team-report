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
    value: (obj) => obj["In Development"].join(", "),
    ...defaults,
  },
  {
    column: "Review",
    value: (obj) => obj.Review.join(", "),
    ...defaults,
  },
  {
    column: "DevTest",
    value: (obj) => obj.DevTest.join(", "),
    ...defaults,
  },
  {
    column: "QA",
    value: (obj) => obj.QA.join(", "),
    ...defaults,
  },
  {
    column: "Needs RC",
    value: (obj) => obj["Needs RC"].join(", "),
    ...defaults,
  },
  {
    column: "Blocked",
    value: (obj) => obj.Blocked.join(", "),
    ...defaults,
  },
  {
    column: "Done",
    value: (obj) => obj.Done.join(", "),
    ...defaults,
  },
  {
    column: "Other",
    value: (obj) => obj.other.join(", "),
    ...defaults,
  },
];
