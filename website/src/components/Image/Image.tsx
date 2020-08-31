import React, { FC } from "react";
import ImageFigure from "./ImageFigure";
import ImageWrapper from "./ImageWrapper";
import ImageFigcaption from "./ImageFigcaption";
import { useImage } from "react-image";

interface ImageProps {
  src: string | string[];
  alt: string;
  text?: string;
}

const Image: FC<ImageProps> = ({
  src: srcToFix,
  alt,
  text,
}: ImageProps): JSX.Element => {
  const { src } = useImage({
    srcList: srcToFix,
  });
  return (
    <ImageFigure>
      <ImageWrapper src={src} alt={alt} />
      {text ? <ImageFigcaption>{text}</ImageFigcaption> : null}
    </ImageFigure>
  );
};

export default Image;
