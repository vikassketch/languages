import "./Footer.scss";
import Settings from "../settings";
import {  useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
const Footer = () => {
  const { isVisible, togglePopup } = useContext(LanguageContext);

  const handleSettingsClick = () => {
    // Call the togglePopup function to update the state in the context
    togglePopup();
  };
  return (
    <>
      {!isVisible && (
        <div className="footer">
          <div className="text-bar" >
            <p className="settings-text" onClick={handleSettingsClick}>Settings</p>
            <div className="bar" onClick={handleSettingsClick}></div>
          </div>
        </div>
      )}
      {isVisible && <Settings/>}
    </>
  );
};

export default Footer;
