import React, { useRef } from "react";
import SnakeFlow from "./SnakeFlow";
import InputImageLayer from "./layers/InputImageLayer";
import StemConvLayer from "./layers/StemConvLayer";
import MBConvLayer from "./layers/MBConvLayer";
import SEPlusSwishLayer from "./layers/SEPlusSwishLayer";
import SoftmaxLayer from "./layers/SoftmaxLayer";

const EfficientNet = () => {
  const firstLayerRef = useRef(null);
  const secondLayerRef = useRef(null);
  const thirdLayerRef = useRef(null);
  const fourthLayerRef = useRef(null);
  const fifthLayerRef = useRef(null);

  const scrollToLayer = (index) => {
    const refs = [firstLayerRef, secondLayerRef, thirdLayerRef, fourthLayerRef, fifthLayerRef];
    refs[index]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="w-full h-screen">
      <SnakeFlow scrollToLayer={scrollToLayer} />
      <div>
        <InputImageLayer ref={firstLayerRef} />
        <StemConvLayer ref={secondLayerRef} />
        <MBConvLayer ref={thirdLayerRef} />
        <SEPlusSwishLayer ref={fourthLayerRef} />
        <SoftmaxLayer ref={fifthLayerRef} />
      </div>
    </section>
  );
};

export default EfficientNet;
