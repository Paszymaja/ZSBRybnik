import Page from "../components/Page";
import { useHistory } from "react-router-dom";
import React, { FC, useEffect } from "react";
import Section from "../components/Section";
import Form from "../components/Form";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import Select from "../components/Select/Select";

export interface ManageUsersPageProps {}

const ManageUsersPage: FC<ManageUsersPageProps> = (): JSX.Element => {
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
            onChange={(e) => {
            }}
          >
            <option value="true">Dodaj nową podstronę w języku polskim</option>
            <option value="false">Dodaj nową podstronę w języku obcym</option>
            <option value="true">Edytuj podstronę w języku polskim</option>
            <option value="false">Edytuj podstronę w języku obcym</option>
            <option value="true">Usuń podstronę w języku polskim</option>
            <option value="false">Usuń podstronę w języku obcym</option>
          </Select>
        </Form>
      </Section>
    </Page>
  );
};

export default ManageUsersPage;
