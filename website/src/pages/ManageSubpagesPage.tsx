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
  const title: string = "Zarządzaj podstronami";
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
            <option value="addPolish">Dodaj nowy post w języku polskim</option>
            <option value="addNotPolish">Dodaj nowy post w języku obcym</option>
            <option value="editPolish">Edytuj post w języku polskim</option>
            <option value="editNotPolish">Edytuj post w języku obcym</option>
            <option value="deletePolish">Usuń post w języku polskim</option>
            <option value="deleteNotPolish">Usuń post w języku obcym</option>
          </Select>
        </Form>
      </Section>
    </Page>
  );
};

export default ManageSubpagesPage;
