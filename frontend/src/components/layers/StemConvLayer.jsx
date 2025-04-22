import React from "react";
import LayerSection from "./LayerSection";

const StemConvLayer = React.forwardRef((props, ref) => {
  const content = [
    "The **Stem Conv Layer** is a convolutional layer that processes the input image. It typically consists of a convolution operation followed by batch normalization and activation functions (such as ReLU). The primary role of this layer is to extract basic features such as edges, textures, and patterns from the input image.",
    "This layer is crucial for preparing the image data for more complex feature extraction in later layers."
  ];

  return <LayerSection ref={ref} title="Stem Conv Layer" content={content} />;
});

export default StemConvLayer;
