import React from "react";
import Page from "../components/Page";
import Section from "../components/Section";
import Form from "../components/Form";

export interface ManageLessonPlanPageProps {}

const ManageLessonPlanPage = () => {
  const title: string = "Zarządzaj planem lekcji";
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form></Form>
      </Section>
    </Page>
  );
};

export default ManageLessonPlanPage;
