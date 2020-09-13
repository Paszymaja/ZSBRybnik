import React, { FC, useContext, useState } from "react";
import { mdiDownload, mdiShare } from "@mdi/js";
import Icon from "@mdi/react";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";
import LinkWrapper from "./LinkWrapper";
import LinkContentWrapper from "./LinkContentWrapper";
import LinkHeader from "./LinkHeader";
import { iconSize } from "../../other/variables";
import { Helmet } from "react-helmet-async";

interface LinkProps {
  title: string;
  href: string;
  toDownload?: boolean;
  inNewCard?: boolean;
}

const Link: FC<LinkProps> = ({
  title,
  href,
  toDownload,
  inNewCard,
}: LinkProps): JSX.Element => {
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [isHovered, setIsHovered] = useState(false);
  const color: string = isDarkTheme ? "#fff" : "#111";
  const icon: string = toDownload ? mdiDownload : mdiShare;
  let hoverTimeout: number;
  return (
    <>
      {isHovered && (
        <Helmet>
          <link rel="preload" href={href} />
        </Helmet>
      )}
      <LinkWrapper
        isDarkTheme={isDarkTheme}
        href={href}
        rel="noopener noreferrer"
        target={inNewCard === true ? "_blank" : ""}
        aria-label={title}
        title={title}
        onMouseEnter={(): void => {
          hoverTimeout = setTimeout(() => {
            setIsHovered(true);
          }, 100);
        }}
        onMouseLeave={(): void => {
          clearTimeout(hoverTimeout);
        }}
      >
        <LinkContentWrapper isDarkTheme={isDarkTheme}>
          <LinkHeader>{title}</LinkHeader>
          <div>
            <Icon path={icon} size={iconSize} color={color} />
          </div>
        </LinkContentWrapper>
      </LinkWrapper>
    </>
  );
};

export default Link;
