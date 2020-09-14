import React, { FC, useContext, useState } from "react";
import SlideOutMenuItemWrapper from "./SlideOutMenuItemWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";
import { Helmet } from "react-helmet-async";

interface OuterLinkProps {
  route: string;
  title: string;
}

const OuterLink: FC<OuterLinkProps> = ({
  route,
  title,
}: OuterLinkProps): JSX.Element => {
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [isHovered, setIsHovered] = useState(false);
  let hoverTimeout: number;
  return (
    <>
      {isHovered && (
        <Helmet>
          <link rel="preload" href={route} />
        </Helmet>
      )}
      <a
        href={route}
        rel="noopener noreferrer"
        title={title}
        aria-label={title}
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
      </a>
    </>
  );
};

export default OuterLink;
