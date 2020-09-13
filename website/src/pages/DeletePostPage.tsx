import {
  FC,
  useEffect,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
  useCallback,
} from "react";
import React from "react";
import Page from "../components/Page";
import { mdiPlus, mdiPencil, mdiDelete } from "@mdi/js";
import { toast } from "react-toastify";
import Button from "../components/Button/Button";
import Section from "../components/Section";
import Form from "../components/Form";
import GlobalContext from "../contextes/globalContext";
import Select from "../components/Select/Select";

type PostAction = "deletePolish" | "deleteNotPolish";

type PostActionDispatcher = [PostAction, SetStateAction<Dispatch<PostAction>>];

export interface DeletePostPageProps {}

const DeletePostPage: FC<DeletePostPageProps> = (): JSX.Element => {
  const title: string = "Usuń post";
  const [selectedPostTitle, setSelectedPostTitle] = useState("");
  const [postsTitles, setPostsTitles] = useState([]);
  const [postAction, setPostAction]: PostActionDispatcher = useState(
    "deletePolish" as PostAction
  );
  const { isMobileDispatcher } = useContext(GlobalContext);
  const [isMobile] = isMobileDispatcher;
  const getPostsTitles = useCallback(() => {
    const tryRequest = async () => {
      try {
        const res: Response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/get-posts-titles?action=getPolishPostsTitles`
        );
        const data = await res.json();
        setPostsTitles(data);
      } catch (err) {}
    };
    if (postAction === "deleteNotPolish") {
      tryRequest();
    }
  }, [postAction]);
  useEffect(() => {
    getPostsTitles();
  }, [setPostAction, postAction, getPostsTitles]);
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form>
          <Select
            label="Wybierz akcję"
            onChange={(e) => {
              const { value } = e.target;
              setPostAction(value as PostAction);
            }}
          >
            <option value="deletePolish">Usuń post w języku polskim</option>
            <option value="deleteNotPolish">Usuń post w języku obcym</option>
          </Select>
          <Select
            label="Wybierz post do usunięcia"
            value={selectedPostTitle}
            onChange={(e) => setSelectedPostTitle(e.target.value)}
          >
            <option disabled></option>
            {postsTitles &&
              postsTitles.map(({ title, id }, index) => {
                return (
                  <option key={index} value={id}>
                    {title}
                  </option>
                );
              })}
          </Select>
          {/*(postAction === "addNotPolish" ||
            postAction === "editNotPolish" ||
            postAction === "deleteNotPolish" ||
            postAction === "deletePolish") && (
            <Select
              label="Język"
              value={postLanguage}
              onChange={(e) => setPostLanguage(e.target.value)}
              disabled={
                postAction === "deleteNotPolish" ||
                postAction === "deletePolish"
                  ? true
                  : false
              }
            >
              <option disabled></option>
              <option value="af">Afrikaans</option>
              <option value="sq">Albanian</option>
              <option value="ar">Arabic</option>
              <option value="hy">Armenian</option>
              <option value="eu">Basque</option>
              <option value="bn">Bengali</option>
              <option value="bg">Bulgarian</option>
              <option value="ca">Catalan</option>
              <option value="km">Cambodian</option>
              <option value="zh">Chinese (Mandarin)</option>
              <option value="hr">Croatian</option>
              <option value="cs">Czech</option>
              <option value="da">Danish</option>
              <option value="nl">Dutch</option>
              <option value="en">English</option>
              <option value="et">Estonian</option>
              <option value="jf">Fiji</option>
              <option value="fi">Finnish</option>
              <option value="fr">French</option>
              <option value="ka">Georgian</option>
              <option value="de">German</option>
              <option value="el">Greek</option>
              <option value="gu">Gujarati</option>
              <option value="he">Hebrew</option>
              <option value="hi">Hindi</option>
              <option value="hu">Hungarian</option>
              <option value="is">Icelandic</option>
              <option value="id">Indonesian</option>
              <option value="ga">Irish</option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="jw">Javanese</option>
              <option value="ko">Korean</option>
              <option value="la">Latin</option>
              <option value="lv">Latvian</option>
              <option value="lt">Lithuanian</option>
              <option value="mk">Macedonian</option>
              <option value="ms">Malay</option>
              <option value="ml">Malayalam</option>
              <option value="mt">Maltese</option>
              <option value="mi">Maori</option>
              <option value="mr">Marathi</option>
              <option value="mn">Mongolian</option>
              <option value="ne">Nepali</option>
              <option value="no">Norwegian</option>
              <option value="fa">Persian</option>
              <option value="pt">Portuguese</option>
              <option value="pa">Punjabi</option>
              <option value="qu">Quechua</option>
              <option value="ro">Romanian</option>
              <option value="ru">Russian</option>
              <option value="sm">Samoan</option>
              <option value="sr">Serbian</option>
              <option value="sk">Slovak</option>
              <option value="sl">Slovenian</option>
              <option value="es">Spanish</option>
              <option value="sw">Swahili</option>
              <option value="sv">Swedish</option>
              <option value="ta">Tamil</option>
              <option value="tt">Tatar</option>
              <option value="te">Telugu</option>
              <option value="th">Thai</option>
              <option value="bo">Tibetan</option>
              <option value="to">Tonga</option>
              <option value="tr">Turkish</option>
              <option value="uk">Ukrainian</option>
              <option value="ur">Urdu</option>
              <option value="uz">Uzbek</option>
              <option value="vi">Vietnamese</option>
              <option value="cy">Welsh</option>
              <option value="xh">Xhosa</option>
            </Select>
            )*/}
          <Button
            title="Usuń post"
            icon={mdiDelete}
            onClick={() => {
              const errorDuringAddingPost = () => {
                toast.error("Wystąpił błąd podczas dodawania postu");
              };
              const tryRequest = async (): Promise<void> => {
                !isMobile && toast.info("Przetwarzam żądanie");
                try {
                  const res: Response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/delete-post?action=${
                      postAction === "deletePolish"
                        ? "deletePolishPost"
                        : "deleteNotPolishPost"
                    }`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: window.localStorage.token,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify({}),
                    }
                  );
                  const { status }: Response = res;
                  if (status === 200) {
                    !isMobile && toast.success("Usunąłeś post");
                  } else {
                    !isMobile && errorDuringAddingPost();
                  }
                } catch (err) {
                  !isMobile && errorDuringAddingPost();
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

export default DeletePostPage;
