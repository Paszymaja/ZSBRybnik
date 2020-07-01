import React, { FC, useEffect, ReactNode, useContext } from "react";
import { Helmet } from "react-helmet-async";
import GlobalContext, {
  GlobalContextCompleteValues,
  TitleDispatcher,
  IsDarkThemeDispatcher,
} from "../contextes/globalContext";
import ContentWrapper from "./ContentWrapper";

interface PageProps {
  title: string;
  children: ReactNode;
}

const Page: FC<PageProps> = ({ title, children }: PageProps): JSX.Element => {
  const { titleDispatcher, isDarkThemeDispatcher }:
    GlobalContextCompleteValues = useContext(GlobalContext);
  const [titleLocal, setTitleLocal]: TitleDispatcher = titleDispatcher;
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const fixedTitle: string = `ZSB Rybnik${
    titleLocal !== "" ? ` - ${titleLocal}` : ""
  }`;
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
    </>
  );
};

export default Page;
