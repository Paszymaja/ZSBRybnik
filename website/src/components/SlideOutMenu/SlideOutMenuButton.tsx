import React, { useContext, FC } from "react";
import SlideOutMenuButtonWrapper from "./SlideOutMenuButtonWrapper";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsSlideOutMenuOpenDispatcher,
} from "../../contextes/globalContext";
import { mdiBackburger, mdiMenu } from "@mdi/js";
import { iconSize } from "../../other/variables";
import Icon from "@mdi/react";

interface SlideOutMenuButtonProps {}

const SlideOutMenuButton: FC<SlideOutMenuButtonProps> = (): JSX.Element => {
  const { isSlideOutMenuOpenDispatcher }: GlobalContextCompleteValues =
    useContext(GlobalContext);
  const [isSlideOutMenuOpen, setIsSlideOutMenuOpen]:
    IsSlideOutMenuOpenDispatcher = isSlideOutMenuOpenDispatcher;
  return (
    <SlideOutMenuButtonWrapper
      title={isSlideOutMenuOpen
        ? "Zamknij menu rozsuwane"
        : "Otwórz menu rozuswane"}
      onClick={(): void => setIsSlideOutMenuOpen(!isSlideOutMenuOpen)}
    >
      {isSlideOutMenuOpen
        ? <Icon path={mdiBackburger} size={iconSize} color="#fff" />
        : <Icon path={mdiMenu} size={iconSize} color="#fff" />}
    </SlideOutMenuButtonWrapper>
  );
};

export default SlideOutMenuButton;
