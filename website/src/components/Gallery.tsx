import React, { useState, FC } from "react";
import FsLightbox from "fslightbox-react";
import GalleryWrapper from "./GalleryWrapper";

interface GalleryProps {
  sources: string[];
}

const Gallery: FC<GalleryProps> = ({ sources }): JSX.Element => {
  const [toggler, setToggler] = useState(false);
  return (
    <>
      <button onClick={() => setToggler(!toggler)}>
        Toggle Lightbox
      </button>
      <GalleryWrapper>
        <FsLightbox
          toggler={toggler}
          sources={sources}
        />
      </GalleryWrapper>
    </>
  );
};

export default Gallery;
