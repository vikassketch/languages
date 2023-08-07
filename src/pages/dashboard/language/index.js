import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import "./Languages.scss";
import Loader from "../../../assests/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Languages = () => {
  const { languages, isVisible, settingsData, updateSettingsData } = useContext(
    LanguageContext
  );
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const usaIndex = languages.findIndex(
    (language) => language.name === "United States"
  );
  console.log("usaIndex", usaIndex);
  console.log("Languages:", languages);
  useEffect(() => {
    if (usaIndex !== -1) {
      setSelectedLanguage(languages[usaIndex].name);
    }
  }, [languages, usaIndex]);
  const textStyle = {
    color: `${settingsData.textColor}`,
    fontSize: `${settingsData.textSize}`,
    display: "flex",
    columnGap: "8px",
  };
  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 7,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    initialSlide: usaIndex !== -1 ? usaIndex + 23 : 0,
    // lazyLoad:'ondemand'
  };

  const handleImageClick = (language) => {
    const langData = {
      languages: language.languages.split(",").map((lang) => lang.trim()),
    };
    updateSettingsData(langData);
  };
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
            <Slider {...settings}>
              {languages.map((language, index) => (
                <div
                  key={language.name}
                  onClick={() => handleImageClick(language)}
                >
                  <img
                    src={language.flagUrl}
                    alt={language.name}
                    className={`${
                      language.name === selectedLanguage && "selected-image"
                    }`}
                  />
                </div>
              ))}
            </Slider>
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
