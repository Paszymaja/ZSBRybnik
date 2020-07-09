import React, { FC, useContext } from "react";
import Page from "../components/Page";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsOnlineDispatcher,
} from "../contextes/globalContext";
import Link from "../components/Link/Link";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation();
  const { isOnlineDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
  const title: string = isOnline ? t("pages.home") : "Strona główna";
  return (
    <Page title={title}>
      <Link
        title="Google Analytics"
        href="https://analytics.google.com/"
      />
    </Page>
  );
};

export default MainPage;
