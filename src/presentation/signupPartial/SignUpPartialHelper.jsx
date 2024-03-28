import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { equal } from "../../utils/javascript";
import {
  getCitiesFromState,
  getCountries,
  getStateFromCountry,
  getWorkBranches,
} from "../../helpers/util";

const SignUpPartialHelper = ({ attribute, formPath }) => {
  const selectedLanguage = useSelector((state) => state?.app?.auth?.language);
  const { parent } = formPath;
  const { formValues } = useSelector((state) => state.form);
  const data = formValues ? formValues[parent] : null;

  const [clonedAttribute, setClonedAttribute] = useState([...attribute]);

  useEffect(() => {
    const setDropdown = async () => {
      const countries = await getCountries();
      const countriesOptions = countries.map((country) => {
        return { label: country, value: country };
      });

      setClonedAttribute((prevClonedAttribute) => {
        const newCountryAttribute = prevClonedAttribute.find((attr) =>
          equal(attr?.name, "country"),
        );

        if (newCountryAttribute) {
          newCountryAttribute.options = countriesOptions;
        }
        return [...prevClonedAttribute];
      });

      if (data?.country) {
        const states = await getStateFromCountry(data?.country);
        const stateOptions = states.map((state) => {
          return { label: state, value: state };
        });
        if (!stateOptions.length) {
          stateOptions.push({ label: "N/A", value: "N/A" });
        }

        setClonedAttribute((prevClonedAttribute) => {
          const newStateAttribute = prevClonedAttribute.find((attr) =>
            equal(attr?.name, "state"),
          );

          if (newStateAttribute) {
            newStateAttribute.options = stateOptions;
          }
          return [...prevClonedAttribute];
        });
      }

      if (data?.country && data?.state) {
        const cities = await getCitiesFromState(data?.country, data?.state);
        const citiesOptions = cities.map((city) => {
          return { label: city, value: city };
        });
        if (!citiesOptions.length) {
          citiesOptions.push({ label: "N/A", value: "N/A" });
        }

        setClonedAttribute((prevClonedAttribute) => {
          const newStateAttribute = prevClonedAttribute.find((attr) =>
            equal(attr?.name, "city"),
          );

          if (newStateAttribute) {
            newStateAttribute.options = citiesOptions;
          }

          return [...prevClonedAttribute];
        });
      }
    };
    setDropdown();
  }, [data?.country, data?.state]);

  useEffect(() => {
    const addWorkBranches = async () => {
      const workBranches = await getWorkBranches();
      const workBranchesOptions = workBranches.map((branch) => {
        return { label: branch, value: branch };
      });

      setClonedAttribute((prevClonedAttribute) => {
        const newWorkBranchAttribute = prevClonedAttribute.find((attr) =>
          equal(attr?.name, "workGoal"),
        );

        if (newWorkBranchAttribute) {
          newWorkBranchAttribute.options = workBranchesOptions;
        }
        return [...prevClonedAttribute];
      });
    };
    addWorkBranches();
  }, []);

  useEffect(() => {
    setClonedAttribute((prevAttribute) => {
      const phoneAttribute = prevAttribute?.find((obj) =>
        equal(obj?.name, "phoneNumber"),
      );
      phoneAttribute.country = equal(selectedLanguage, "nl") ? "nl" : "us";
      return [...prevAttribute];
    });
  }, [selectedLanguage]);

  return { clonedAttribute };
};

export default SignUpPartialHelper;
