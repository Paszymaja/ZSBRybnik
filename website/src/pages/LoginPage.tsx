import React, {
  FC,
  useEffect,
  useContext,
  useState,
} from "react";
import Page from "../components/Page";
import { useHistory, Link, Redirect } from "react-router-dom";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
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
import parseJWT from "../other/parseJWT";

export interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = (): JSX.Element => {
  const history = useHistory();
  const { t }: UseTranslationResponse = useTranslation();
  const { isOnlineDispatcher, isMobileDispatcher, privilegeLevelDispatcher }:
    GlobalContextCompleteValues = useContext(
      GlobalContext,
    );
  const [privilegeLevel, setPrivilegeLevel] = privilegeLevelDispatcher;
  const [isMobile]: IsMobileDispatcher = isMobileDispatcher;
  const [isOnline]: IsOnlineDispatcher = isOnlineDispatcher;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const title: string = isOnline ? t("login-page.title") : "Zaloguj się";
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  return (
    privilegeLevel === "unlogged"
      ? <Page title={title}>
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
            <Button
              title="Zaloguj się"
              icon={mdiLogin}
              onClick={() => {
                const errorDuringLoging = () => {
                  toast.error("Wystąpił błąd podczas logowania 😭", {
                    position: "bottom-right",
                  });
                };
                const tryRequest = async (): Promise<void> => {
                  !isMobile && toast.info("Przetwarzam żądanie", {
                    position: "bottom-right",
                  });
                  const controller: AbortController = new AbortController();
                  const signal: AbortSignal = controller.signal;
                  try {
                    const res: Response = await fetch(
                      `${process.env.REACT_APP_API_URL}/api/login`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                        },
                        signal: signal,
                        body: JSON.stringify({
                          login,
                          password,
                        }),
                      },
                    );
                    const status: number = res.status;
                    if (status === 200) {
                      const { token } = await res.json();
                      if (token) {
                        const { role } = parseJWT(token);
                        setPrivilegeLevel(role);
                        window.localStorage.token = token;
                        !isMobile && toast.success("Zalogowałeś się!", {
                          position: "bottom-right",
                        });
                      } else {
                        !isMobile && errorDuringLoging();
                      }
                    } else {
                      !isMobile && errorDuringLoging();
                    }
                  } catch (err) {
                    !isMobile && errorDuringLoging();
                    controller.abort();
                  }
                };
                if (login.length !== 0 && password.length !== 0) {
                  tryRequest();
                } else {
                  !isMobile &&
                    toast.error("Login lub hasło nie mogą być puste", {
                      position: "bottom-right",
                    });
                }
              }}
            />
            <Link to="/reset-password">
              <Button
                title="Zresetuj hasło"
                icon={mdiLifebuoy}
              />
            </Link>
          </Form>
        </Section>
      </Page>
      : <Redirect to="/" />
  );
};

export default LoginPage;
