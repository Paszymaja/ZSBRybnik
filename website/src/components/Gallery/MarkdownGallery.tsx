import React, { FC } from "react";
import Gallery from "./Gallery";
import { SourceType } from "fslightbox-react";

interface MarkdownGalleryProps {
  sources: string;
  types: string;
}

const MarkdownGallery: FC<MarkdownGalleryProps> = ({
  sources,
  types,
}: MarkdownGalleryProps): JSX.Element => {
  const arraySources: string[] = JSON.parse(sources);
  const arrayTypes: SourceType[] = JSON.parse(types);
  return <Gallery sources={arraySources} types={arrayTypes} />;
};

export default MarkdownGallery;
