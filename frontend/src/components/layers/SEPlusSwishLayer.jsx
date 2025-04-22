import React from "react";
import LayerSection from "./LayerSection";

const SEPlusSwishLayer = React.forwardRef((props, ref) => {
  const content = [
    "The **SE+Swish Layer** combines two powerful techniques in neural networks: Squeeze-and-Excitation (SE) and the Swish activation function. The SE block adapts the network's feature learning by recalibrating channel-wise feature responses, making the network more expressive. The Swish activation function improves learning dynamics by allowing smoother gradients and better optimization during training.",
    "This layer enhances the network's ability to focus on important features and improves the efficiency of the learning process."
  ];

  return <LayerSection ref={ref} title="SE + Swish Layer" content={content} />;
});

export default SEPlusSwishLayer;
