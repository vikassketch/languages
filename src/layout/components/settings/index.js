import { useState, useContext } from "react";
import MultipleOptions from "../../../assests/MultiOptions";
import { LanguageContext } from "../../../context/LanguageContext";
import Options from "../../../assests/Options";
import CloseIcon from "../../../assests/CloseIcon";
import SettingsIcon from "../../../assests/SettingsIcon";
import "./Settings.scss";

const Settings = ({ onClose }) => {
  const {
    isVisible,
    togglePopup,
    appBasicUI,
    datamnemonics,
    settingsData,
  } = useContext(LanguageContext);
  const [rotationStates, setRotationStates] = useState(() =>
    Array(4).fill(false)
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = (index) => {
    setRotationStates((prevRotationStates) => {
      const updatedStates = Array(4).fill(false);
      if (!prevRotationStates[index]) {
        updatedStates[index] = true;
        const selectedOption = appBasicUI[index];
        setSelectedOption(selectedOption);
      } else {
        setSelectedOption(null);
      }
      return updatedStates;
    });
  };

  const handleSettingsClick = () => {
    console.log("testing inside");
    togglePopup();
  };
  return (
    <>
      {isVisible && (
        <div className="settings-popup">
          <CloseIcon onClick={handleSettingsClick} />
          <div className="settings-header">
            <SettingsIcon />
            <h3 onClick={handleSettingsClick}>Settings</h3>
          </div>
          <div className="settings-options">
            <div className="options">
              <span className="option-heading">Languages</span>
              <div className="answer-arrow">
                {settingsData.languages.map((language,index)=>(
                  <span className="answer" key={index}>{language}</span>
                ))}
                
                {/* <Options
                  className={`custom-option-icon ${
                    rotationStates[0] && "rotate"
                  }`}
                  onClick={() => handleOptionClick(0)}
                /> */}
              </div>
            </div>
            <div className="options">
              <span className="option-heading">Text Color</span>
              <div className="answer-arrow">
                <span className="answer">
                  {datamnemonics.textColors[settingsData.textColor]}
                </span>
                <Options
                  className={`custom-option-icon ${
                    rotationStates[1] && "rotate"
                  }`}
                  onClick={() => handleOptionClick(1)}
                />
              </div>
            </div>
            <div className="options">
              <span className="option-heading">Text Size</span>
              <div className="answer-arrow">
                <span className="answer">
                  {datamnemonics.textSizes[settingsData.textSize]}
                </span>
                <Options
                  className={`custom-option-icon ${
                    rotationStates[2] && "rotate"
                  }`}
                  onClick={() => handleOptionClick(2)}
                />
              </div>
            </div>
            <div className="options">
              <span className="option-heading">Theme</span>
              <div className="answer-arrow">
                <span className="answer">
                  {datamnemonics.themeColors[settingsData.theme]}
                </span>
                <Options
                  className={`custom-option-icon ${
                    rotationStates[3] && "rotate"
                  }`}
                  onClick={() => handleOptionClick(3)}
                />
              </div>
            </div>
          </div>
          {selectedOption && (
            <MultipleOptions
              optionsData={selectedOption}
              key={selectedOption.option}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Settings;
