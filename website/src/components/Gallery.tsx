import React, { useState, FC, useContext } from "react";
import FsLightbox from "fslightbox-react";
import GalleryWrapper from "./GalleryWrapper";
import GalleryButton from "./GalleryButton";
import GlobalContext from "../stores/globalStore";
import GalleryLogo from "./GalleryLogo";

interface GalleryProps {
  sources: string[];
}

const Gallery: FC<GalleryProps> = ({ sources }): JSX.Element => {
  const [toggler, setToggler] = useState(false);
  const { isDarkThemeDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  return (
    <>
      <GalleryButton
        isDarkTheme={isDarkTheme}
        onClick={() => setToggler(!toggler)}
      >
        <GalleryLogo
          isDarkTheme={isDarkTheme}
          src="/images/logo.png"
          alt="logo"
        />
        <br />
        Zobacz galerię
      </GalleryButton>
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
