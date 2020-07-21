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
  return (
    <LoaderWrapper width={width} height={height}>
      <LoaderImage src="/images/logo.webp" alt="Logo" aria-label="Logo" />
    </LoaderWrapper>
  );
};

export default Loader;
