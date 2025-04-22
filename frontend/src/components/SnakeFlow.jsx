import React from "react";
import SnakeConnector from "./SnakeConnector"; // Make sure to import the SnakeConnector

const SnakeFlow = ({ scrollToLayer }) => {
  const data = [
    { label: "Input Image", color: "#FB923C" }, // orange-500
    { label: "Stem Conv", color: "#FACC15" },   // yellow-400
    { label: "MBConv x7", color: "#4ADE80" },   // green-400
    { label: "SE + Swish", color: "#22D3EE" },  // cyan-400
    { label: "Softmax", color: "#3B82F6" }      // blue-500
  ];

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center overflow-x-auto px-14">
      <div className="flex space-x-11 relative items-center">
        {data.map((item, idx) => {
          const isUp = idx % 2 === 0;
          return (
            <React.Fragment key={idx}>
              <div
                className={`flex flex-col items-center ${
                  isUp ? "-mt-22" : "mt-22"
                } relative`}
              >
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl"
                  style={{ backgroundColor: item.color }}
                  onClick={() => scrollToLayer(idx)}
                >
                  {idx + 1}
                </div>
                <div className="mt-5 text-base text-gray-700 text-center w-44 font-semibold">
                  {item.label}
                </div>
              </div>
              {idx < data.length - 1 && (
                <div className="flex items-center">
                  <SnakeConnector up={isUp} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SnakeFlow;
