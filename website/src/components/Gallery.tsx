import React, { useState, FC, useContext } from "react";
import FsLightbox from "fslightbox-react";
import GalleryWrapper from "./GalleryWrapper";
import GalleryButton from "./GalleryButton";
import GlobalContext from "../stores/globalStore";
import GalleryLogo from "./GalleryLogo";
import { useTranslation, UseTranslationResponse } from "react-i18next";

interface GalleryProps {
  sources: string[];
}

const Gallery: FC<GalleryProps> = ({ sources }): JSX.Element => {
  const [toggler, setToggler] = useState(false);
  const { isDarkThemeDispatcher, isOnlineDispatcher } = useContext(
    GlobalContext,
  );
  const { t }: UseTranslationResponse = useTranslation();
  const [isDarkTheme] = isDarkThemeDispatcher;
  const [isOnline] = isOnlineDispatcher;
  const checkGallery: string = isOnline
    ? t("quick-actions.gallery")
    : "Zobacz galerię";
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
        {checkGallery}
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
