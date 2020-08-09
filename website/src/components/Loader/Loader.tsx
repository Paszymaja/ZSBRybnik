import React, { FC } from "react";
import LoaderWrapper from "./LoaderWrapper";
import LoaderImage from "./LoaderImage";

interface LoaderProps {
  width: string;
  height: string;
}

const Loader: FC<LoaderProps> = (
  { width, height }: LoaderProps,
): JSX.Element => {
  const loaderLogoImage: string = `${process.env.REACT_APP_CDN_URL}/images/logo.webp`
  return (
    <LoaderWrapper width={width} height={height}>
      <LoaderImage src={loaderLogoImage} alt="Logo" aria-label="Logo" />
    </LoaderWrapper>
  );
};

export default Loader;
