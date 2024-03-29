import React from "react";

interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
  minLength?: number;
}

const BarcodeComponent: React.FC<BarcodeProps> = ({
  value,
  width = 2,
  height = 50,
  minLength = 35,
}) => {
  const adjustedValue =
    value.toString().length < minLength
      ? value.toString().padEnd(minLength, "0")
      : value;

  const bars: JSX.Element[] = [];

  const binarySequence = adjustedValue
    .toString()
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  for (let i = 0; i < binarySequence.length / 5; i++) {
    const isBlack = binarySequence[i] === "1";
    const barStyle = {
      width: `2px`,
      height: `${height}px`,
      backgroundColor: isBlack ? "var(--hero_card_bg)" : "white",
    };

    bars.push(<div key={i} style={barStyle} />);
  }

  return (
    <span className="rowContainer" style={{ width: width }}>
      {bars}
    </span>
  );
};

export default BarcodeComponent;
