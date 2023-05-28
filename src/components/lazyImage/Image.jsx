import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ src, className, alt }) => {
  return (
    <LazyLoadImage
      src={src}
      className={className ?? ""}
      alt={alt ?? ""}
      effect="blur"
    />
  );
};

export default Image;
