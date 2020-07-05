import React, { FC } from "react";
import ImageFigure from "./ImageFigure";
import ImageWrapper from "./ImageWrapper";
import ImageFigcaption from "./ImageFigcaption";

interface ImageProps {
  src: string;
  alt: string;
  text?: string;
}

const Image: FC<ImageProps> = (
  { src, alt, text }: ImageProps,
): JSX.Element => {
  return (
    <ImageFigure>
      <ImageWrapper src={src} alt={alt} />
      {text ? <ImageFigcaption>{text}</ImageFigcaption> : null}
    </ImageFigure>
  );
};

export default Image;
