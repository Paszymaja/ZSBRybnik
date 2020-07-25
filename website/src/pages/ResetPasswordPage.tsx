import Page from "../components/Page";
import React, { useContext } from "react";
import Section from "../components/Section";
import InputBox from "../components/InputBox/InputBox";
import Button from "../components/Button/Button";
import { mdiLifebuoy } from "@mdi/js";
import GlobalContext from "../contextes/globalContext";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export interface ResetPasswordPageProps {}

const ResetPasswordPage = () => {
  const { privilegeLevelDispatcher, isMobileDispatcher } = useContext(
    GlobalContext,
  );
  const [isMobile] = isMobileDispatcher;
  const [privilegeLevel] = privilegeLevelDispatcher;
  return (
    privilegeLevel === "unlogged"
      ? <Page title="Resetowanie hasła">
        <h2>Resetowanie hasła:</h2>
        <Section>
          <InputBox label="Login lub email" />
          <Button
            title="Zresetuj hasło"
            icon={mdiLifebuoy}
            onClick={() => {
              !isMobile && toast.info("Przetwarzam żądanie");
            }}
          />
        </Section>
      </Page>
      : <Redirect to="/" />
  );
};

export default ResetPasswordPage;
