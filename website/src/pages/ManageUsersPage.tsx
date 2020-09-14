import Page from "../components/Page";
import React, {
  FC,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import Section from "../components/Section";
import Form from "../components/Form";
import Select from "../components/Select/Select";
import InputBox from "../components/InputBox/InputBox";
import Button from "../components/Button/Button";
import { mdiPlus, mdiPencil, mdiDelete } from "@mdi/js";
import GlobalContext from "../contextes/globalContext";
import { toast } from "react-toastify";

type UserAction = "addUser" | "deleteUser" | "editUser";

export interface ManageUsersPageProps {}

const ManageUsersPage: FC<ManageUsersPageProps> = (): JSX.Element => {
  const { isMobileDispatcher } = useContext(GlobalContext);
  const [isMobile] = isMobileDispatcher;
  const title: string = "Zarządzaj użytkownikami";
  const [userAction, setUserAction] = useState("addUser" as UserAction);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  useEffect((): void => {
    const getUsers = async () => {
      try {
        const res: Response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/get-users`
        );
        const data = await res.json();
      } catch (err) {}
    };
    if (userAction === "editUser" || userAction === "deleteUser") {
      getUsers();
    }
  }, [userAction]);
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form>
          <Select
            label="Wybierz akcję"
            value={userAction}
            onChange={(e) => {
              setUserAction(e.target.value as UserAction);
            }}
          >
            <option value="addUser">Dodaj nowego użytkownika</option>
            <option value="editUser">Edytuj istniejącego użytkownika</option>
            <option value="deleteUser">Usuń istniejącego użytkownika</option>
          </Select>
          {(userAction === "editUser" || userAction === "deleteUser") && (
            <Select
              label={
                userAction === "editUser"
                  ? "Wybierz użytkownika do edycji"
                  : "Wybierz użytkownika do usunięcia"
              }
              onChange={(e) => {}}
            >
              <option disabled></option>
              {users &&
                users.map(({ id, username }, index) => {
                  return (
                    <option key={index} value={id}>
                      {username}
                    </option>
                  );
                })}
            </Select>
          )}
          <InputBox
            label="Login"
            value={login}
            placeholder="Maksymalnie 50 znaków"
            maxLength={50}
            onChange={(e) => setLogin(e.target.value)}
            disabled={userAction === "deleteUser" ? true : false}
          />
          <InputBox
            label="Email"
            value={email}
            placeholder="Maksymalnie 50 znaków"
            maxLength={50}
            onChange={(e) => setEmail(e.target.value)}
            disabled={userAction === "deleteUser" ? true : false}
          />
          <Select
            label="Wybierz rolę"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={userAction === "deleteUser" ? true : false}
          >
            <option disabled></option>
            <option value="student">Uczeń</option>
            <option value="admin">Administrator</option>
          </Select>
          <Button
            title={
              userAction === "addUser"
                ? "Dodaj użytkownika"
                : userAction === "editUser"
                ? "Edytuj użytkownika"
                : "Uusń użytkownika"
            }
            icon={
              userAction === "addUser"
                ? mdiPlus
                : userAction === "editUser"
                ? mdiPencil
                : mdiDelete
            }
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

export default ManageUsersPage;
