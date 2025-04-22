import React from "react";
import LayerSection from "./LayerSection";

const SoftmaxLayer = React.forwardRef((props, ref) => {
  const content = [
    "The **Softmax Layer** is typically the final layer in a neural network used for classification tasks. It converts the raw output scores (logits) into probability distributions over the classes. Each class's probability is calculated by exponentiating its logits and normalizing them by dividing by the sum of all the exponentiated logits.",
    "This layer is essential for multi-class classification problems as it ensures that the network outputs probabilities that sum up to 1, making it easier to interpret the network's predictions."
  ];

  return <LayerSection ref={ref} title="Softmax Layer" content={content} />;
});

export default SoftmaxLayer;
