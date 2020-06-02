import React, { FC, useEffect, ReactNode, useContext } from "react";
import { Helmet } from 'react-helmet-async';
import GlobalContext from '../stores/globalStore';
import ContentWrapper from "./ContentWrapper";
import Presentation from "./Presentation";

interface PageProps {
  title: string;
  children: ReactNode;
}

const Page: FC<PageProps> = ({ title, children }): JSX.Element => {
  const { titleDispatcher, isMobileDispatcher, isDarkThemeDispatcher } = useContext(GlobalContext);
  const [titleLocal, setTitleLocal] = titleDispatcher;
  const [isMobile] = isMobileDispatcher;
  const [isDarkTheme] = isDarkThemeDispatcher;
  useEffect((): void => {
    setTitleLocal(title);
  }, [title, setTitleLocal]);
  return (
    <>
      <Helmet>
        <title>ZSB Rybnik {titleLocal !== "" ? "-" : ""} {titleLocal}</title>
      </Helmet>
      <ContentWrapper isDarkTheme={isDarkTheme}>
        {children}
      </ContentWrapper>
      {isMobile === false ? <Presentation /> : null}
    </>
  );
};

export default Page;