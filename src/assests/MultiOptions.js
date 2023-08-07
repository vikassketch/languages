import "./Icons.scss";
import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";

const MultipleOptions = (optionsData, key) => {
  console.log("entry");
  const { updateSettingsData } = useContext(LanguageContext);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption);
  const dataToFill = optionsData.optionsData;
  const handleOptionClick = (index) => {
    updateSettingsData({ [dataToFill.option]: dataToFill.values[index] });
    setSelectedOption(index);
  };
  useEffect(() => {
    return () => {
      setSelectedOption(null); // Reset selectedOption when unmounting
    };
  }, [key]);
  return (
    <div className="options">
      <div className="mutiple-options">
        {dataToFill.fill &&
          dataToFill.values.map((color, index) => (
            <div
              key={index}
              className={`circle ${selectedOption === index && "selected"}`}
              style={{ backgroundColor: color }}
              onClick={() => handleOptionClick(index)}
            ></div>
          ))}
        {!dataToFill.fill &&
          dataToFill.values.map((value, index) => (
            <div
              key={index}
              className={`circle ${selectedOption === index && "selected"}`}
              onClick={() => handleOptionClick(index)}
            ></div>
          ))}
      </div>
      {!dataToFill.fill && (
        <div className="textOptions">
          {dataToFill.values.map((fontSize, index) => (
            <span key={index} style={{ fontSize: fontSize }}>
              Aa
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
export default MultipleOptions;
