import React, { FC, useContext, useState, useEffect } from "react";
import PresentationWrapper from "./PresentationWrapper";
import PresentationBlock from "./PresentationBlock";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";
import PresentationSection from "./PresentationSection";
/*import PresentationImageBlock from "./PresentationImageBlock";
import PresentationContentFitImageBlock from "./PresentationContentFitImageBlock";
import PresentationImageSection from "./PresentationImageSection";*/

interface PresentationProps {}

const Presentation: FC<PresentationProps> = (): JSX.Element => {
  const { isDarkThemeDispatcher, isAuthorizedDispatcher }:
    GlobalContextCompleteValues = useContext(
      GlobalContext,
    );
  const [isAuthorized] = isAuthorizedDispatcher;
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [sessionTime, setSessionTime] = useState(0);
  useEffect(
    () => {
      setTimeout(() => {
        if (isAuthorized) {
          setSessionTime((sessionTime: number): number => sessionTime + 1);
        } else {
          setSessionTime(0);
        }
      }, 1000);
    },
    [
      isAuthorized,
      sessionTime,
      setSessionTime,
    ],
  );
  return (
    <PresentationWrapper>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <h2>Czas trwania sesji:</h2>
        <PresentationSection>
          {sessionTime / 60 / 60 >= 1
            ? <div>{Math.floor(sessionTime / 60 / 60 % 60)} godzin</div>
            : null}
          {sessionTime / 60 >= 1
            ? <div>{Math.floor(sessionTime / 60 % 60)} minut</div>
            : null}
          <div>{sessionTime % 60} sekund</div>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <h2>Ilość postów:</h2>
        <PresentationSection>
          0
        </PresentationSection>
      </PresentationBlock>
    </PresentationWrapper>
  );
};

export default Presentation;
