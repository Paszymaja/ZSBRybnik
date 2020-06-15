import React, { FC, useEffect, useState, useContext } from "react";
import ReactEmbed from "react-embed";
import EmbedWrapper from "./EmbedWrapper";
import GlobalContext from "../stores/globalStore";

interface EmbedProps {
  url: string;
  isTwitter?: boolean;
}

const Embed: FC<EmbedProps> = ({ url, isTwitter }: EmbedProps) => {
  const { isDarkThemeDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    const tryToFixSize = () => {
      try {
        const firstElement = document.querySelector("twitter-widget");
        if (firstElement === null) {
          setTimeout(tryToFixSize, 250);
        }
        const elements: NodeListOf<Element> = document.querySelectorAll(
          "twitter-widget",
        );
        let i: number = 0;
        for (i; i < elements!.length; i++) {
          const shadowRoot: ShadowRoot | null = elements[i]!.shadowRoot;
          const embeddedTweet: HTMLElement | null = shadowRoot!.querySelector(
            ".EmbeddedTweet",
          );
          embeddedTweet!.style.maxWidth = "100%";
        }
        setFixed(true);
      } catch (err) {
        if (!fixed) {
          setTimeout(tryToFixSize, 250);
        }
      }
    };
    if (isTwitter) {
      tryToFixSize();
    }
  }, [fixed, setFixed, isTwitter]);
  return (
    <EmbedWrapper>
      <ReactEmbed isDark={isDarkTheme} url={url} />
    </EmbedWrapper>
  );
};

export default Embed;
