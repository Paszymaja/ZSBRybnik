import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import React from "react";
import Page from "../components/Page";
import Section from "../components/Section";
import Form from "../components/Form";

export interface DeletePostPageProps {}

const DeletePostPage: FC<DeletePostPageProps> = (): JSX.Element => {
  const history = useHistory();
  const title: string = "Usuń post";
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

export default DeletePostPage;
