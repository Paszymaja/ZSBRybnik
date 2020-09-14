import React, { FC, useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsMobileDispatcher,
  IsSlideOutMenuOpenDispatcher,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";
import scrollTop from "../../other/scrollTop";
import SlideOutMenuItemWrapper from "./SlideOutMenuItemWrapper";

interface InnerLinkProps {
  route: string;
  title: string;
  onlyForMobile?: boolean;
  onClick?: Function;
}

const InnerLink: FC<InnerLinkProps> = ({
  route,
  title,
  onlyForMobile,
  onClick,
}: InnerLinkProps): JSX.Element => {
  const {
    isMobileDispatcher,
    isSlideOutMenuOpenDispatcher,
    isDarkThemeDispatcher,
  }: GlobalContextCompleteValues = useContext(GlobalContext);
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [
    ,
    setIsSlideOutMenuOpen,
  ]: IsSlideOutMenuOpenDispatcher = isSlideOutMenuOpenDispatcher;
  const [isMobile]: IsMobileDispatcher = isMobileDispatcher;
  const [isHovered, setIsHovered] = useState(false);
  let hoverTimeout: number;
  return (
    <>
      {(onlyForMobile && isMobile) || !onlyForMobile ? (
        <>
          {isHovered && (
            <Helmet>
              <link rel="preload" href={route} />
            </Helmet>
          )}
          <Link
            to={route}
            title={title}
            aria-label={title}
            onClick={(): void => {
              scrollTop();
              setIsSlideOutMenuOpen(false);
              if (onClick) {
                onClick();
              }
            }}
            onMouseEnter={(): void => {
              hoverTimeout = setTimeout(() => {
                setIsHovered(true);
              }, 100);
            }}
            onMouseLeave={(): void => {
              clearTimeout(hoverTimeout);
            }}
          >
            <SlideOutMenuItemWrapper isDarkTheme={isDarkTheme}>
              {title}
            </SlideOutMenuItemWrapper>
          </Link>
        </>
      ) : null}
    </>
  );
};

export default InnerLink;
