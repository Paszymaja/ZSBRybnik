import React, { FC, useContext, useState } from "react";
import Page from "../components/Page";
import { Link, Redirect } from "react-router-dom";
import Section from "../components/Section";
import { useTranslation, UseTranslationResponse } from "react-i18next";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsOnlineDispatcher,
  IsMobileDispatcher,
} from "../contextes/globalContext";
import InputBox from "../components/InputBox/InputBox";
import Button from "../components/Button/Button";
import { mdiLogin, mdiLifebuoy } from "@mdi/js";
import { toast } from "react-toastify";
import Form from "../components/Form";
import parseJWT, { Token } from "../other/parseJWT";

type LoginResponse = {
  token: string;
};

export interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation();
  const {
    isOnlineDispatcher,
    isMobileDispatcher,
    privilegeLevelDispatcher,
  }: GlobalContextCompleteValues = useContext(GlobalContext);
  const [privilegeLevel, setPrivilegeLevel] = privilegeLevelDispatcher;
  const [isMobile]: IsMobileDispatcher = isMobileDispatcher;
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const title: string = isOnline ? t("login-page.title") : "Zaloguj się";
  return privilegeLevel === "unlogged" ? (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form>
          <InputBox
            label="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <InputBox
            label="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />
          <InputBox
            label="Kod autentykacyjny"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            required
          />
          <Button
            title="Zaloguj się"
            icon={mdiLogin}
            onClick={() => {
              const errorDuringLoging = () => {
                toast.error("Wystąpił błąd podczas logowania 😭");
              };
              const tryRequest = async (): Promise<void> => {
                !isMobile && toast.info("Przetwarzam żądanie");
                try {
                  const res: Response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/login`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify({
                        login,
                        password,
                        authCode,
                      }),
                    }
                  );
                  const status: number = res.status;
                  if (status === 200) {
                    const { token }: LoginResponse = await res.json();
                    if (token) {
                      const { role }: Token = parseJWT(token);
                      setPrivilegeLevel(role);
                      window.localStorage.token = token;
                      !isMobile && toast.success("Zalogowałeś się!");
                    } else {
                      !isMobile && errorDuringLoging();
                    }
                  } else {
                    !isMobile && errorDuringLoging();
                  }
                } catch (err) {
                  !isMobile && errorDuringLoging();
                }
              };
              if (login === "" || password === "") {
                if (login === "") {
                  !isMobile && toast.error("Login nie może być puste");
                }
                if (password === "") {
                  !isMobile && toast.error("Hasło nie może być puste");
                }
                return;
              }
              tryRequest();
            }}
          />
          <Link to="/reset-password">
            <Button title="Zresetuj hasło" icon={mdiLifebuoy} />
          </Link>
        </Form>
      </Section>
    </Page>
  ) : (
    <Redirect to="/" />
  );
};

export default LoginPage;
