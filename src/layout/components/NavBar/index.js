import { useState, useEffect } from "react";
import BatteryIcon from "../../../assests/BatteryIcon";
import WiFiIcon from "../../../assests/WifiIcon";
import "./NavBar.scss";

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [signalStrength, setSignalStrength] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    if (!navigator.getBattery) {
      console.log("Battery API not supported in this browser.");
      return;
    }

    // Function to update battery level
    const updateBatteryStatus = (battery) => {
      setBatteryLevel((battery.level * 100).toFixed(2));
    };

    // Get the battery status
    navigator.getBattery().then((battery) => {
      updateBatteryStatus(battery);
      // Listen for battery level changes
      battery.addEventListener("levelchange", () =>
        updateBatteryStatus(battery)
      );
    });
    const calculateSignalStrengthPercentage = (effectiveType) => {
      switch (effectiveType) {
        case "slow-2g":
          return 0;
        case "2g":
          return 25;
        case "3g":
          return 50;
        case "4g":
          return 75;
        case "5g":
          return 100;
        default:
          return 100; // Default to 100% for unknown types
      }
    };
    if ("connection" in navigator) {
      const connection = navigator.connection;

      const updateSignalStrength = () => {
        const signalStrengthPercentage = calculateSignalStrengthPercentage(
          connection.effectiveType
        );
        console.log(connection.effectiveType);
        setSignalStrength(signalStrengthPercentage);
      };

      connection.addEventListener("change", updateSignalStrength);
      // Run the initial signal strength update
      updateSignalStrength();
      return () => {
        connection.removeEventListener("change", updateSignalStrength);
      };
    } else {
      // Fallback value (you can customize this value)
      setSignalStrength(80);
    }
    return () => {
      navigator.getBattery().then((battery) => {
        battery.removeEventListener("levelchange", () =>
          updateBatteryStatus(battery)
        );
      });
      clearInterval(timer);
    };
  }, []);
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  return (
    <div className="header">
      <span className="current-time">{formattedTime}</span>
      <div className="icons">
        <WiFiIcon signalStrength={signalStrength} />
        {batteryLevel !== null ? (
          <BatteryIcon batteryLevel={batteryLevel} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default NavBar;
