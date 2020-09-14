import Page from "../components/Page";
import React, { FC } from "react";
import Section from "../components/Section";
import Form from "../components/Form";
import Select from "../components/Select/Select";

export interface ManageSubpagesPageProps {}

const ManageSubpagesPage: FC<ManageSubpagesPageProps> = () => {
  const title: string = "Zarządzaj podstronami";
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form>
          <Select label="Wybierz akcję" onChange={() => {}}>
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
