import React from "react";

// SnakeConnector component to visualize the arrows between layers
const SnakeConnector = ({ up }) => (
  <svg
    width="150"
    height="120"
    viewBox="0 0 150 120"
    fill="none"
    className="min-w-[150px]"
  >
    <path
      d={
        up
          ? "M0,90 C40,120 110,0 150,30" // If 'up' is true, the path goes up
          : "M0,30 C40,0 110,120 150,90" // If 'up' is false, the path goes down
      }
      stroke="#3B82F6" // Blue color for the stroke
      strokeWidth="6" // Stroke width for the path
      fill="none" // No fill for the path, just the stroke
    />
  </svg>
);

export default SnakeConnector;
