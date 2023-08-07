import "./Icons.scss";
const BatteryIcon = ({ batteryLevel }) => {
  const batteryWidth = (batteryLevel / 100) * 44;
  const batteryIndicatorX = 0; // Start from the left side (0)

  return (
    <div className="battery-container">
      <svg
        width="18"
        height="8"
        viewBox="0 0 50 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          border: "1.5px solid #666666",
          borderRadius: "3px",
          paddingLeft: "1px",
        }}
      >
        {/* Outline */}
        <rect
          x="1"
          y="1"
          width="48"
          height="22"
          rx="4"
          stroke="black"
          strokeWidth="2"
        />

        {/* Battery level indicator */}
        <rect
          x={batteryIndicatorX}
          y="3"
          width={batteryWidth}
          height="18"
          rx="4"
          fill="#ffffff"
        />
      </svg>
      <div className="triangle"></div>
    </div>
  );
};

export default BatteryIcon;
