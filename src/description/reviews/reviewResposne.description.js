export const formPath = {
  parent: "review-response",
  child: "response-submit",
};

export const filterdAtrribute = [
  {
    name: "star",
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
    gridXsm: 6,
    gridXs: 12,
  },
];

export const defaultOptions = {
  star: "",
};

export const perPage = 5;

export const resposneMinLength = 8;
