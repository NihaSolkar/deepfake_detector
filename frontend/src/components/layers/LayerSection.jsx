import React from "react";

// LayerSection component to show each layer's explanation
const LayerSection = React.forwardRef(({ title, content }, ref) => {
  return (
    <div ref={ref} className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center px-10">
      <h2 className="text-4xl font-bold text-center text-blue-500 mb-8">{title}</h2>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-4">{content[0]}</p>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-8">{content[1]}</p>
    </div>
  );
});

export default LayerSection;
