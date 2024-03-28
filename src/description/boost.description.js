export const planAttMonthly = [
  {
    name: "priceId",
    label: "basic",
    value: process.env.REACT_APP_BASIC_PLAN_MONTHLY,
    description: "€39 ",
    duration: "/ month",
    error: ["basicRequired"],
    message: "boostPlanMessage",
    btnVariant: "outlined",
    btnText: "stayBasic",
    gridMd: 12,
    gridXs: 12,
    term1: "term1BasicPlan",
    term2: "term2BasicPlan",
    term3: "term3BasicPlan",
    term4: "term4BasicPlan",
  },
  {
    name: "priceId",
    label: "Pro",
    value: process.env.REACT_APP_PRO_PLAN_MONTHLY,
    description: "€59 ",
    duration: "/ month",
    error: ["proRequired"],
    message: "boostPlanMessage",
    btnVariant: "contained",
    btnText: "goPro",
    gridXs: 12,
    term1: "term1ProPlan",
    term2: "term2ProPlan",
    term3: "term3ProPlan",
    term4: "term4ProPlan",
  },
];

export const planAttYearly = [
  {
    name: "priceId",
    label: "basic",
    value: process.env.REACT_APP_BASIC_PLAN_YEARLY,
    description: "€399 ",
    duration: "/ year",
    backColor: "#0E854E1A",
    error: ["basicRequired"],
    message: "boostPlanMessage",
    btnVariant: "outlined",
    btnText: "stayBasic",
    gridMd: 12,
    gridXs: 12,
    term1: "term1BasicPlan",
    term2: "term2BasicPlan",
    term3: "term3BasicPlan",
    term4: "term4BasicPlan",
  },
  {
    name: "priceId",
    label: "Pro",
    value: process.env.REACT_APP_PRO_PLAN_YEARLY,
    description: "€550 ",
    duration: "/ year",
    backColor: "#0E854E80",
    error: ["proRequired"],
    message: "boostPlanMessage",
    btnVariant: "contained",
    btnText: "goPro",
    gridXs: 12,
    term1: "term1ProPlan",
    term2: "term2ProPlan",
    term3: "term3ProPlan",
    term4: "term4ProPlan",
  },
];

export const defaultValues = {
  priceId: "",
};

export const formPath = { parent: "boost" };