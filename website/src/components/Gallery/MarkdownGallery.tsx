import React, { FC } from "react";
import Gallery from "./Gallery";

interface MarkdownGalleryProps {
  sources: string;
}

const MarkdownGallery: FC<MarkdownGalleryProps> = (
  { sources }: MarkdownGalleryProps,
): JSX.Element => {
  const arraySources = JSON.parse(sources);
  return (
    <Gallery sources={arraySources} />
  );
};

export default MarkdownGallery;
