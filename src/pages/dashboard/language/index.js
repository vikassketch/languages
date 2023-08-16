import { useState, useContext, useEffect, useCallback } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import "./Languages.scss";
import Loader from "../../../assests/Loader";
import debounce from "lodash.debounce";

const Languages = () => {
  const { languages, isVisible, settingsData, updateSettingsData } = useContext(
    LanguageContext
  );
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [countriesToDisplay, setcountriesToDisplay] = useState([]);
  const usaIndex = languages.findIndex(
    (language) => language.name === "United States"
  );
  const displayCountries = useCallback(() => {
    setcountriesToDisplay(
      window.innerWidth > 640
        ? languages.slice(
            Math.max(0, usaIndex - 3),
            Math.min(languages.length, usaIndex + 4)
          )
        : languages.slice(
            Math.max(0, usaIndex - 2),
            Math.min(languages.length, usaIndex + 3)
          )
    );
  }, [languages, usaIndex]);
  useEffect(() => {
    if (usaIndex !== -1) {
      setSelectedLanguage(languages[usaIndex].name);
    }
    displayCountries();
  }, [usaIndex, displayCountries, languages]);
  const textStyle = {
    color: `${settingsData.textColor}`,
    fontSize: `${settingsData.textSize}`,
    display: "flex",
    columnGap: "8px",
  };
  const handleImageClick = (language) => {
    setSelectedLanguage(language.name);
    const langData = {
      languages: language.languages.split(",").map((lang) => lang.trim()),
    };
    updateSettingsData(langData);
  };
  const getCountrySize = (index, middleIndex) => {
    const distanceFromMiddle = Math.abs(index - middleIndex);
    switch (distanceFromMiddle) {
      case 0:
        return "bigImg";
      case 1:
        return "smallImg";
      case 2:
        return "smallerImg";
      default:
        return "smallestImg";
    }
  };
  const handleScroll = debounce((event) => {
    console.log("testing scroll", event.deltaX, countriesToDisplay[0].name);
    const startIndex = languages.findIndex(
      (language) => language.name === countriesToDisplay[0].name
    );
    const endIndex = languages.findIndex(
      (language) =>
        language.name ===
        countriesToDisplay[countriesToDisplay.length - 1].name
    );
    console.log(startIndex,endIndex)
    if (event.deltaX > 0) {
      console.log(languages.slice(startIndex - 1, endIndex));
      const newCountries = languages.slice(startIndex+1, endIndex+2);
      setcountriesToDisplay(newCountries);
    }
    if(event.deltaX < 0){
      console.log(languages.slice(startIndex+1, endIndex+2));
      const newCountries =languages.slice(startIndex - 1, endIndex);
      setcountriesToDisplay(newCountries);
    }
  },500);
  const middleIndex = Math.floor(countriesToDisplay.length / 2);
  return (
    <div className={`languages-options ${isVisible && "settings-opened"}`}>
      <div className="lang-caption">
        <h1>Welcome</h1>
        <h1>Select Language</h1>
      </div>
      <div
        className="loader-and-languages"
        style={{ display: isVisible && "none" }}
      >
        {languages.length === 0 ? (
          <Loader />
        ) : (
          <div className="languages">
            <div className="totalCountries" onWheel={handleScroll}>
              {countriesToDisplay.map((language, index) => (
                <div
                  key={language.name}
                  onClick={() => handleImageClick(language)}
                  className="eachCountry"
                >
                  <img
                    src={language.flagUrl}
                    alt={language.name}
                    className={`flagImg ${
                      language.name === selectedLanguage && "selected-image"
                    } ${getCountrySize(index, middleIndex)}`}
                  />
                </div>
              ))}
            </div>
            {selectedLanguage && (
              <p className="show" style={textStyle}>
                {settingsData.languages.map((language, index) => (
                  <span key={index}>{language}</span>
                ))}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Languages;
