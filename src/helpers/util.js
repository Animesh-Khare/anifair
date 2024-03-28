import axios from "axios";
import { apiEndPoints, method } from "../utils/constant";
import { ApiContainer } from "../utils/api";
import { showToast } from "../utils/toastService";

export const getAllCities = async (countryCode = 1) => {
  try {
    const { data } = await axios({
      method: method.get,
      url: `${process.env.REACT_APP_API_URL}/${apiEndPoints?.cities}?countryCode=${countryCode}`,
    });

    const citySet = new Set(data?.data?.city);

    const cityLabelValuePairs = Array.from(citySet).map((city) => ({
      label: city,
      value: city,
    }));

    return cityLabelValuePairs;
  } catch (error) {
    showToast(error);
    return [];
  }
};

export const reverseObject = (object) => {
  const reverseMap = {};
  for (const key in object) {
    reverseMap[object[key]] = parseFloat(key);
  }
  return reverseMap;
};

export const getCountries = async () => {
  try {
    const { data } = await axios({
      method: method.get,
      url: `${process.env.REACT_APP_API_URL}/${apiEndPoints?.country}`,
    });
    return data?.data?.country;
  } catch (error) {
    showToast(error);
    return [];
  }
};
export const getStateFromCountry = async (country) => {
  try {
    const { data } = await axios({
      method: method.get,
      url: `${process.env.REACT_APP_API_URL}/${apiEndPoints?.state}?country=${country}`,
    });
    return data?.data?.state;
  } catch (error) {
    showToast(error);
    return [];
  }
};
export const getCitiesFromState = async (country, state) => {
  try {
    const { data } = await axios({
      method: method.get,
      url: `${process.env.REACT_APP_API_URL}/${apiEndPoints?.city}?country=${country}&state=${state}`,
    });
    return data?.data?.city;
  } catch (error) {
    showToast(error);
    return [];
  }
};

export const getWorkBranches = async () => {
  try {
    const { data } = await axios({
      method: method.get,
      url: `${process.env.REACT_APP_API_URL}/${apiEndPoints?.workBranches}`,
    });
    return data?.data?.data;
  } catch (error) {
    showToast(error);
    return [];
  }
};

export const getSubscriptionDetails = async () => {
  const { performRequest } = ApiContainer();
  try {
    const response = await performRequest({
      endPoint: apiEndPoints?.subscriptionPriceList,
      method: method.get,
    });
    return response?.data;
  } catch (error) {
    showToast(error);
    return [];
  }
};
