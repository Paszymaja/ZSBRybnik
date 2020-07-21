import React, { FC, useEffect, useContext } from "react";
import Page from "../components/Page";
import { useHistory } from "react-router-dom";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import Section from "../components/Section";
import TextBlock from "../components/TextBlock/TextBlock";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsOnlineDispatcher,
} from "../contextes/globalContext";
import Link from "../components/Link/Link";

export interface Error404Props {}

const Error404: FC<Error404Props> = (): JSX.Element => {
  const history = useHistory();
  const { t }: UseTranslationResponse = useTranslation();
  const { isOnlineDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
  const title: string = isOnline
    ? t("error-pages.404-error.title")
    : "Błąd 404";
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  const errorCodeText: string = isOnline
    ? t("error-pages.404-error.error-text")
    : "Niestety nie udało nam się znaleźć żadnej treści pod tym adresem. Jeśli sądzisz, że jest to nieprawidłowe działanie witryny zgłoś błąd po przez link poniżej.";
  const errorLink: string = isOnline
    ? t("quick-actions.report-issue")
    : "Zgłoś błąd";
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <TextBlock value={errorCodeText} />
        <Link
          title={errorLink}
          href="https://github.com/KrzysztofZawisla/ZSBRybnik/issues"
        />
      </Section>
    </Page>
  );
};

export default Error404;
