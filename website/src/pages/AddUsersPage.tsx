import React, { FC, useContext, useState } from "react";
import GlobalContext from "../contextes/globalContext";
import Page from "../components/Page";
import Section from "../components/Section";
import Form from "../components/Form";
import Select from "../components/Select/Select";
import InputBox from "../components/InputBox/InputBox";
import Button from "../components/Button/Button";
import { mdiPlus } from "@mdi/js";
import { toast } from "react-toastify";

export interface AddUsersPageProps {}

const AddUsersPage: FC<AddUsersPageProps> = (): JSX.Element => {
  const { isMobileDispatcher } = useContext(GlobalContext);
  const [isMobile] = isMobileDispatcher;
  const title: string = "Dodaj użytkowników";
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form>
          <InputBox
            label="Login"
            value={login}
            placeholder="Maksymalnie 50 znaków"
            maxLength={50}
            onChange={(e) => setLogin(e.target.value)}
          />
          <InputBox
            label="Email"
            value={email}
            placeholder="Maksymalnie 50 znaków"
            maxLength={50}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select
            label="Wybierz rolę"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option disabled></option>
            <option value="student">Uczeń</option>
            <option value="admin">Administrator</option>
          </Select>
          <Button
            title={"Dodaj użytkownika"}
            icon={mdiPlus}
            onClick={() => {
              const errorDuringAddingUser = () => {
                toast.error("Wystąpił błąd podczas dodawania użytkownika");
              };
              const tryRequest = async (): Promise<void> => {
                !isMobile && toast.info("Przetwarzam żądanie");
                try {
                  const res: Response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/add-user`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: window.localStorage.token,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify({
                        login,
                        email,
                        role,
                      }),
                    }
                  );
                  const { status }: Response = res;
                  if (status === 200) {
                    !isMobile && toast.success("Dodałeś użytkownika");
                  } else {
                    !isMobile && errorDuringAddingUser();
                  }
                } catch (err) {
                  !isMobile && errorDuringAddingUser();
                }
              };
              tryRequest();
            }}
          />
        </Form>
      </Section>
    </Page>
  );
};

export default AddUsersPage;
