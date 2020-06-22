import React, { FC, useEffect, ReactNode, useContext } from "react";
import { Helmet } from "react-helmet-async";
import GlobalContext, {
  GlobalContextCompleteValues,
  TitleDispatcher,
  IsMobileDispatcher,
  IsDarkThemeDispatcher,
} from "../stores/globalStore";
import ContentWrapper from "./ContentWrapper";
import Presentation from "./Presentation";

interface PageProps {
  title: string;
  children: ReactNode;
}

const Page: FC<PageProps> = ({ title, children }): JSX.Element => {
  const { titleDispatcher, isMobileDispatcher, isDarkThemeDispatcher }:
    GlobalContextCompleteValues = useContext(GlobalContext);
  const [titleLocal, setTitleLocal]: TitleDispatcher = titleDispatcher;
  const [isMobile]: IsMobileDispatcher = isMobileDispatcher;
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const fixedTitle: string = `ZSB Rybnik ${
    titleLocal !== "" ? "-" : ""
  } ${titleLocal}`;
  useEffect((): void => {
    setTitleLocal(title);
  }, [title, setTitleLocal]);
  return (
    <>
      <Helmet>
        <title>{fixedTitle}</title>
        <meta name="og:title" content={fixedTitle} />
      </Helmet>
      <ContentWrapper isDarkTheme={isDarkTheme}>
        {children}
      </ContentWrapper>
      {isMobile === false ? <Presentation /> : null}
    </>
  );
};

export default Page;
