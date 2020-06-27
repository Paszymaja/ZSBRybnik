import React, {
  useState,
  FC,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import FsLightbox from "fslightbox-react";
import GalleryWrapper from "./GalleryWrapper";
import GalleryButton from "./GalleryButton";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
  IsOnlineDispatcher,
} from "../../stores/globalStore";
import GalleryLogo from "./GalleryLogo";
import { useTranslation, UseTranslationResponse } from "react-i18next";

interface GalleryProps {
  sources: string[];
}

type TogglerDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];

const Gallery: FC<GalleryProps> = ({ sources }): JSX.Element => {
  const [toggler, setToggler]: TogglerDispatcher = useState(
    false,
  ) as TogglerDispatcher;
  const { isDarkThemeDispatcher, isOnlineDispatcher }:
    GlobalContextCompleteValues = useContext(
      GlobalContext,
    );
  const { t }: UseTranslationResponse = useTranslation();
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
  const checkGallery: string = isOnline
    ? t("quick-actions.gallery")
    : "Zobacz galerię";
  return (
    <>
      <GalleryButton
        isDarkTheme={isDarkTheme}
        onClick={() => setToggler(!toggler)}
        title={checkGallery}
      >
        <GalleryLogo
          isDarkTheme={isDarkTheme}
          src="/images/logo.webp"
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
