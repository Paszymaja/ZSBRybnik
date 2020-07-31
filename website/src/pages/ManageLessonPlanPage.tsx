import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import Page from "../components/Page";
import Section from "../components/Section";
import Form from "../components/Form";

export interface ManageLessonPlanPageProps {}

const ManageLessonPlanPage = () => {
  const history = useHistory();
  const title: string = "Zarządzaj planem lekcji";
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form>
        </Form>
      </Section>
    </Page>
  );
};

export default ManageLessonPlanPage;
