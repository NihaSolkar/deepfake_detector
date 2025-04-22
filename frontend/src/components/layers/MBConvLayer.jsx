import React from "react";
import LayerSection from "./LayerSection";

const MBConvLayer = React.forwardRef((props, ref) => {
  const content = [
    "The **MBConv Layer** (Mobile Inverted Residual Bottleneck Convolution) is a key component in efficient neural networks. It performs depthwise separable convolutions, which significantly reduce the number of parameters and computations, making the model more efficient. The layer applies convolution operations using a smaller set of filters, followed by a pointwise convolution to combine features, ensuring efficient feature extraction.",
    "This layer is crucial for maintaining high accuracy while keeping the model computationally light, making it suitable for mobile and edge devices."
  ];

  return <LayerSection ref={ref} title="MBConv Layer" content={content} />;
});

export default MBConvLayer;
