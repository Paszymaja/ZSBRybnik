import React, { FC, useContext } from "react";
import SlideOutMenuItemWrapper from "./SlideOutMenuItemWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";

interface OuterLinkProps {
  route: string;
  title: string;
}

const OuterLink: FC<OuterLinkProps> = (
  { route, title }: OuterLinkProps,
): JSX.Element => {
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  return (
    <a
      href={route}
      rel="noopener noreferrer"
      title={title}
      aria-label={title}
    >
      <SlideOutMenuItemWrapper
        isDarkTheme={isDarkTheme}
      >
        {title}
      </SlideOutMenuItemWrapper>
    </a>
  );
};

export default OuterLink;
