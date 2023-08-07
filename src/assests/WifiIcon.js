import "./Icons.scss";
const WiFiIcon = ({ signalStrength }) => {
  const iconWidth = 15; // Width of the icon
  const iconHeight = 16; // Height of the icon
  const numBars = 4; // Total number of bars in the icon
  const barWidth = iconWidth / (numBars * 1.5); // Width of each bar, including gaps
  const gapWidth = barWidth; // Width of the gap between bars
  const borderRadius = barWidth / 4; // Border radius for the bars

  return (
    <svg
      viewBox={`0 0 ${iconWidth} ${iconHeight}`}
      width="30"
      height="20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="wifi-icon"
    >
      {/* WiFi Icon with traditional bars */}
      {Array.from({ length: numBars }).map((_, index) => {
        const x = index * barWidth + index * gapWidth + gapWidth / 2; // X position for each bar with gap
        const barHeight =
          index === 0
            ? (index + 1) * (iconHeight / numBars)
            : (index + 1) * (iconHeight / numBars) - 2 * index; // Height of each bar
        const barSignalStrength = ((index + 1) / numBars) * 100; // Signal strength threshold for the bar
        const y = iconHeight - barHeight;

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={borderRadius}
            ry={borderRadius}
            fill={signalStrength >= barSignalStrength ? "#ffffff" : "none"}
          />
        );
      })}
    </svg>
  );
};

export default WiFiIcon;
