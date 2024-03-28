import { notEmptyOrNull } from "../../utils/constant";

export const formPath = {
  parent: "brand-overview",
};

export const attribute = [
  {
    name: "description",
    label: "description",
    type: "text",
    isRequired: true,
    pattern: notEmptyOrNull,
    variant: "outlined",
    placeholder: "yourDescription",
    error: ["descriptionRequired"],
    gridXs: 12,
  },
];

export const defaultValues = {
  description: "",
};

export const descriptionMinLength = 15;
export const descriptionMaxLength = 500;
