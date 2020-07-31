import Page from "../components/Page";
import { useHistory } from "react-router-dom";
import React, { useEffect, FC } from "react";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import Section from "../components/Section";
import Form from "../components/Form";
import Select from "../components/Select/Select";

export interface ManageSubpagesPageProps {}

const ManageSubpagesPage: FC<ManageSubpagesPageProps> = () => {
  const history = useHistory();
  const title: string = "Zarządzaj użytkownikami";
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form>
          <Select
            label="Wybierz akcję"
            onChange={() => {}}
          >
            <option value="true">Dodaj użytkownika</option>
            <option value="false">Edytuj użytkownika</option>
            <option value="true">Usuń użytkownika</option>
            <option value="false">Zarządzaj użytkownikami zbiorowo</option>
          </Select>
        </Form>
      </Section>
    </Page>
  );
};

export default ManageSubpagesPage;
