import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [languages, setLanguages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const appBasicUI = [
    {},
    {
      option: "textColor",
      fill: true,
      values: ["#ffffff", "#fdf498", "#30E5D3", "#58668b"],
    },
    {
      option: "textSize",
      fill: false,
      values: ["20px", "28px", "32px", "40px"],
    },
    {
      option: "theme",
      fill: true,
      values: ["#d31777", "#660099", "#998866", "#000000"],
    },
  ];
  const [settingsData, setSettingsData] = useState({
    languages: ["English"],
    textColor: "#ffffff",
    textSize: "20px",
    theme: "#000000",
  });
  const datamnemonics = {
    textColors: {
      "#ffffff": "White",
      "#fdf498": "Picasso",
      "#30E5D3": "Cyan",
      "#58668b": "Pale Blue",
    },
    textSizes: {
      "20px": "Small",
      "28px": "Medium",
      "32px": "Large",
      "40px": "X-Large",
    },
    themeColors: {
      "#d31777": "Pink Red",
      "#660099": "Royal Purple",
      "#998866": "Soil",
      "#000000": "Custom",
    },
  };

  const togglePopup = () => {
    setIsVisible((prevVisible) => !prevVisible);
  };
  const updateSettingsData = (newData) => {
    console.log(newData);
    setSettingsData({ ...settingsData, ...newData });
    console.log("seet", settingsData);
  };

  useEffect(() => {
    // Fetch data from the API and update the languages state
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countriesData = response.data.map((country) => ({
          name: country.name.common,
          languages: country.languages
            ? Object.values(country.languages).join(", ")
            : "Unknown",
          flagUrl: country.flags.svg,
        }));
        setLanguages(countriesData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        languages,
        isVisible,
        togglePopup,
        settingsData,
        updateSettingsData,
        appBasicUI,
        datamnemonics,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
