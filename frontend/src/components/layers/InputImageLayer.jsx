import React from "react";
import LayerSection from "./LayerSection";

const InputImageLayer = React.forwardRef((props, ref) => {
  const content = [
    "The **Input Image Layer** is the first layer in a Convolutional Neural Network (CNN). This is where the raw image data enters the model. The image is represented as a matrix of pixel values (usually RGB for color images). The network processes the image by converting it into numerical data, and then it moves through various layers for feature extraction and learning.",
    "In this layer, the image is resized and normalized to ensure the data is in the right format for processing by the network."
  ];

  return <LayerSection ref={ref} title="Input Image Layer" content={content} />;
});

export default InputImageLayer;
