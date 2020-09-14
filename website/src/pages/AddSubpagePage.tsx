import Page from "../components/Page";
import React, { FC, useState, SetStateAction, Dispatch } from "react";
import Section from "../components/Section";
import Form from "../components/Form";
import Select from "../components/Select/Select";
import InputBox from "../components/InputBox/InputBox";
import Button from "../components/Button/Button";
import { mdiPlus } from "@mdi/js";

type SubpageAction = "addPolish" | "addNotPolish";

type SubpageActionDispatcher = [
  SubpageAction,
  SetStateAction<Dispatch<SubpageAction>>
];

export interface AddSubpagePageProps {}

const AddSubpagePage: FC<AddSubpagePageProps> = () => {
  const title: string = "Dodaj podstronę";
  const [subpageAction, setSubpageAction]: SubpageActionDispatcher = useState(
    "addPolish" as SubpageAction
  );
  const [subpageTitle, setSubpageTitle] = useState("");
  const [subpageRoute, setSetSubpageRoute] = useState("");
  const [subpageDisplayTitle, setSubpageDisplayTitle] = useState(true);
  const [createMenuLink, setCreateMenuLink] = useState(true);
  const [menuLinkName, setMenuLinkName] = useState("");
  const [menuLinkCategory, setMenuLinkCategory] = useState("");
  const [menuNewCategory, setMenuNewCategory] = useState(false);
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form>
          <Select
            label="Wybierz akcję"
            onChange={(e) => {
              const { value } = e.target;
              setSubpageAction(value as SubpageAction);
            }}
          >
            <option value="addPolish">
              Dodaj nową podstronę w języku polskim
            </option>
            <option value="addNotPolish">
              Dodaj nową podstronę w języku obcym
            </option>
          </Select>
          <InputBox
            label="Tytuł"
            value={subpageTitle}
            placeholder="Maksymalnie 255 znaków"
            maxLength={255}
            onChange={(e) => setSubpageTitle(e.target.value)}
          />
          <InputBox
            label="Ścieżka"
            value={subpageRoute}
            placeholder="Maksymalnie 255 znaków"
            maxLength={255}
            onChange={(e) => setSetSubpageRoute(e.target.value)}
          />
          <Select
            label="Wyświetlić tytuł"
            onChange={(e) => {
              const { value } = e.target;
              const isTrue: boolean = value === "true";
              setSubpageDisplayTitle(isTrue);
            }}
          >
            <option value="true">Tak</option>
            <option value="false">Nie</option>
          </Select>
          <Select
            label="Utworzyć link w menu"
            onChange={(e) => {
              const { value } = e.target;
              const isTrue: boolean = value === "true";
              setCreateMenuLink(isTrue);
            }}
          >
            <option value="true">Tak</option>
            <option value="false">Nie</option>
          </Select>
          {createMenuLink && (
            <>
              <InputBox
                label="Nazwa linku w menu"
                value={menuLinkName}
                placeholder="Maksymalnie 255 znaków"
                maxLength={255}
                onChange={(e) => setMenuLinkName(e.target.value)}
              />
              <Select
                label="Kategoria"
                onChange={(e) => {
                  const { value } = e.target;
                  if (value === "noCategory") {
                    setMenuLinkCategory("");
                  } else if (value === "newCategory") {
                    setMenuNewCategory(true);
                  } else {
                    setMenuLinkCategory(value);
                  }
                }}
              >
                <option value="noCategory">Brak</option>
                <option value="newCategory">Nowa kategoria</option>
              </Select>
              {menuNewCategory && (
                <InputBox
                  label="Nazwa kategorii"
                  value={menuLinkName}
                  placeholder="Maksymalnie 255 znaków"
                  maxLength={255}
                  onChange={(e) => setMenuLinkName(e.target.value)}
                />
              )}
            </>
          )}
          <Button title="Dodaj postronę" icon={mdiPlus} onClick={() => {}} />
        </Form>
      </Section>
    </Page>
  );
};

export default AddSubpagePage;
