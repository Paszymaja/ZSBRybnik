import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  Dispatch,
  SetStateAction,
  FC,
  useState,
} from "react";
import React from "react";
import PresentationImageBlockWrapper from "./PresentationImageBlockWrapper";

interface PresentationImageBlockProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  fallback?: string | string[];
  src: string;
}

type ImageSrcDispatcher = [string, Dispatch<SetStateAction<string>>];
type ArraySourcesCounterDispatcher = [number, Dispatch<SetStateAction<number>>];

const PresentationImageBlock: FC<PresentationImageBlockProps> = ({
  src,
  fallback,
  ...rest
}): JSX.Element => {
  const [
    arraySourcesCounter,
    setArraySourcesCounter,
  ]: ArraySourcesCounterDispatcher = useState(0);
  const [imageSrc, setImageSrc]: ImageSrcDispatcher = useState(src);
  const setFallbackImage = (): void => {
    if (fallback) {
      const isFallbackArray: boolean = Array.isArray(fallback);
      const fallbackArrayLength = fallback.length;
      if (isFallbackArray) {
        if (fallbackArrayLength - 1 > arraySourcesCounter) {
          setArraySourcesCounter(arraySourcesCounter + 1);
        }
      }
      setImageSrc(
        isFallbackArray ? fallback[arraySourcesCounter] : (fallback as string)
      );
    }
  };
  return (
    <PresentationImageBlockWrapper
      src={imageSrc}
      onError={setFallbackImage}
      {...(rest as ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
};

export default PresentationImageBlock;
