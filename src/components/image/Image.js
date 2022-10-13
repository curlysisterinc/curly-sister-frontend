/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function Image({ ...image }) {
  return (
    <LazyLoadImage
      wrapperClassName="w-full relative"
      alt={image.alt}
      effect="blur"
      src={image.src}
      {...image}
    />
  );
}
