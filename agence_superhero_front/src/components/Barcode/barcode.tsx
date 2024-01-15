import React from "react";

interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
}

const BarcodeComponent: React.FC<BarcodeProps> = ({
  value,
  width = 2,
  height = 50,
}) => {
  const bars: JSX.Element[] = [];

  const binarySequence = value
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
