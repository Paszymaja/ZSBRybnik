import React, { FC, useEffect, ReactNode, useContext } from "react";
import { Helmet } from 'react-helmet';
import GlobalContext from '../stores/globalStore';

interface PageProps {
  title: string;
  children: ReactNode;
}

const Page: FC<PageProps> = ({ title, children }): JSX.Element => {
  const { titleDispatcher, isMobileDispatcher } = useContext(GlobalContext);
  const [titleLocal, setTitleLocal] = titleDispatcher;
  const [isMobile] = isMobileDispatcher;
  useEffect((): void => {
    setTitleLocal(title);
  }, [title, setTitleLocal]);
  return (
    <>
      <Helmet>
        <title>ZSB Rybnik {titleLocal !== "" ? "-" : ""} {titleLocal}</title>
      </Helmet>
      <div>
        {children}
      </div>
      {isMobile === false ? null : null}
    </>
  );
};

export default Page;