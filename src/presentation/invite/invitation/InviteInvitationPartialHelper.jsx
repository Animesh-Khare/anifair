import { useEffect, useState } from "react";
import { getCountries } from "../../../helpers/util";
import { equal } from "../../../utils/javascript";

const InviteInvitationPartialHelper = ({ attribute, formPath }) => {
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
    };
    setDropdown();
  }, []);

  return { clonedAttribute };
};

export default InviteInvitationPartialHelper;
