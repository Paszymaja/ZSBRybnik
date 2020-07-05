import React, {
  FC,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import ReactEmbed from "react-embed";
import EmbedWrapper from "./EmbedWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";

interface EmbedProps {
  url: string;
  isTwitter?: boolean;
}

type IsFixedDispatcher = [boolean, Dispatch<SetStateAction<boolean>>];
type TryToFixSize = () => void;
type FirstElement = Element | null;
type ShadowRootEl = ShadowRoot | null;
type EmbeddedTweet = HTMLElement | null;

const Embed: FC<EmbedProps> = ({ url, isTwitter }: EmbedProps): JSX.Element => {
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [isFixed, setIsFixed]: IsFixedDispatcher = useState(
    false,
  ) as IsFixedDispatcher;
  useEffect(() => {
    const tryToFixSize: TryToFixSize = (): void => {
      try {
        const firstElement: FirstElement = document.querySelector(
          "twitter-widget",
        );
        if (firstElement === null) {
          setTimeout(tryToFixSize, 250);
        }
        const elements: NodeListOf<Element> = document.querySelectorAll(
          "twitter-widget",
        );
        let i: number = 0;
        for (i; i < elements!.length; i++) {
          const shadowRoot: ShadowRootEl = elements[i]!.shadowRoot;
          const embeddedTweet: EmbeddedTweet = shadowRoot!.querySelector(
            ".EmbeddedTweet",
          );
          embeddedTweet!.style.maxWidth = "100%";
        }
        setIsFixed(true);
      } catch (err) {
        if (!isFixed) {
          setTimeout(tryToFixSize, 250);
        }
      }
    };
    if (isTwitter) {
      tryToFixSize();
    }
  }, [isFixed, setIsFixed, isTwitter]);
  return (
    <EmbedWrapper>
      <ReactEmbed isDark={isDarkTheme} url={url} />
    </EmbedWrapper>
  );
};

export default Embed;
