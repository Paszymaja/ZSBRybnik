import React, { FC, useContext } from "react";
import { mdiDownload, mdiShare } from "@mdi/js";
import Icon from "@mdi/react";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../stores/globalStore";
import LinkWrapper from "./LinkWrapper";
import LinkContentWrapper from "./LinkContentWrapper";
import LinkText from "./LinkText";
import { iconSize } from "../../other/variables";

interface LinkProps {
  title: string;
  href: string;
  toDownload?: boolean;
  inNewCard?: boolean;
}

const Link: FC<LinkProps> = (
  { title, href, toDownload, inNewCard }: LinkProps,
): JSX.Element => {
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const color: string = isDarkTheme ? "#fff" : "#111";
  const icon: string = toDownload ? mdiDownload : mdiShare;
  return (
    <LinkWrapper
      isDarkTheme={isDarkTheme}
      href={href}
      rel="noopener noreferrer"
      target={inNewCard === true ? "_blank" : ""}
      aria-label={title}
    >
      <LinkContentWrapper isDarkTheme={isDarkTheme}>
        <LinkText>
          <h3>{title}</h3>
        </LinkText>
        <div>
          <Icon path={icon} size={iconSize} color={color} />
        </div>
      </LinkContentWrapper>
    </LinkWrapper>
  );
};

export default Link;
