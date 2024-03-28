export const formPath = {
  parent: "dashboard",
  child: "review-table",
};

export const chartLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const filterOptions = [{ value: "5 Star" }];

export const filterdAtrribute = [
  {
    name: "order",
    type: "select",
    isRequired: false,
    placeholder: "filterOrder",
    options: [
      {
        value: "",
        label: "filterAll",
        isTranslate: true,
      },
      {
        value: "5",
        label: "5 Star",
      },
      {
        value: "4",
        label: "4 Star",
      },
      {
        value: "3",
        label: "3 Star",
      },
      {
        value: "2",
        label: "2 Star",
      },
      {
        value: "1",
        label: "1 Star",
      },
    ],
    gridXl: 2,
    gridLg: 3,
    gridMd: 4,
    gridSm: 4,
    gridXs: 6,
  },
  {
    name: "month",
    type: "select",
    isRequired: false,
    options: [
      {
        value: "12",
        label: "last12Month",
        isTranslate: true,
      },
      {
        value: "6",
        label: "last6Month",
        isTranslate: true,
      },
      {
        value: "3",
        label: "last3Month",
        isTranslate: true,
      },
    ],
    gridXl: 2,
    gridLg: 3,
    gridMd: 4,
    gridSm: 4,
    gridXs: 6,
  },
];

export const defaultOptions = {
  order: "",
  month: "12",
};

export const reviewTableHeads = [
  "verified",
  "companyRating",
  "name",
  "greenRating",
  "recommendation",
  "report",
];
