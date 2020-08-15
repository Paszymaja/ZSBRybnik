import React, {
  useState,
  FC,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import FsLightbox, { SourceType } from "fslightbox-react";
import GalleryWrapper from "./GalleryWrapper";
import GalleryButton from "./GalleryButton";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
  IsOnlineDispatcher,
} from "../../contextes/globalContext";
import GalleryLogo from "./GalleryLogo";
import { useTranslation, UseTranslationResponse } from "react-i18next";

interface GalleryProps {
  sources: string[];
  types: SourceType[];
}

type TogglerDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];

const Gallery: FC<GalleryProps> = ({
  sources,
  types,
}: GalleryProps): JSX.Element => {
  const [toggler, setToggler]: TogglerDispatcher = useState(
    false
  ) as TogglerDispatcher;
  const {
    isDarkThemeDispatcher,
    isOnlineDispatcher,
  }: GlobalContextCompleteValues = useContext(GlobalContext);
  const { t }: UseTranslationResponse = useTranslation();
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
  const gallerLogo: string = `${process.env.REACT_APP_CDN_URL}/images/logo.webp`;
  const checkGallery: string = isOnline
    ? t("quick-actions.gallery")
    : "Zobacz galerię";
  return (
    <>
      <GalleryButton
        isDarkTheme={isDarkTheme}
        onClick={(): void => setToggler(!toggler)}
        title={checkGallery}
      >
        <GalleryLogo isDarkTheme={isDarkTheme} src={gallerLogo} alt="logo" />
        <br />
        {checkGallery}
      </GalleryButton>
      <GalleryWrapper>
        <FsLightbox toggler={toggler} sources={sources} types={types} />
      </GalleryWrapper>
    </>
  );
};

export default Gallery;
