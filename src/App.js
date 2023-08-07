import { useContext } from "react";
import NavBar from "./layout/components/NavBar";
import Footer from "./layout/components/Footer";
import Languages from "./pages/dashboard/language";
import { LanguageContext } from "./context/LanguageContext";
import "./App.css";
import "./utils/Fonts.scss";

function App() {
  const { settingsData } = useContext(LanguageContext);
  console.log(settingsData.theme)
  const themeStyle={
    backgroundColor : `${settingsData.theme}`
  }
  console.log(themeStyle)
  return (
    <div className="main-container" style={themeStyle}>
      <NavBar />
      <Languages />
      <Footer />
    </div>
  );
}

export default App;
