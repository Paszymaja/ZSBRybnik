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
import { mdiPlus } from "@mdi/js";
import { toast } from "react-toastify";
import Button from "../components/Button/Button";
import Textarea from "../components/Textarea/Textarea";
import Section from "../components/Section";
import Form from "../components/Form";
import GlobalContext from "../contextes/globalContext";
import InputBox from "../components/InputBox/InputBox";
import Select from "../components/Select/Select";

type PostAction = "addPolish" | "addNotPolish";

type PostActionDispatcher = [PostAction, SetStateAction<Dispatch<PostAction>>];

export interface AddPostPageProps {}

const AddPostPage: FC<AddPostPageProps> = (): JSX.Element => {
  const title: string = "Zarządzaj postami";
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postIntroduction, setPostIntroduction] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postImageAlt, setPostImageAlt] = useState("");
  const [postLanguage, setPostLanguage] = useState("");
  const [postAction, setPostAction]: PostActionDispatcher = useState(
    "addPolish" as PostAction
  );
  const [postsTitles, setPostsTitles] = useState([]);
  const [postAuthor, setPostAuthor] = useState("");
  const [selectedPostTitle, setSelectedPostTitle] = useState("");
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
    if (postAction === "addNotPolish") {
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
            <option value="addPolish">Dodaj nowy post w języku polskim</option>
            <option value="addNotPolish">Dodaj nowy post w języku obcym</option>
          </Select>
          {postAction === "addNotPolish" && (
            <Select
              label={"Wybierz odpowiednik w języku Polskim"}
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
          )}
          <InputBox
            label="Tytuł"
            value={postTitle}
            placeholder="Maksymalnie 255 znaków"
            maxLength={255}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <InputBox
            label="Miniaturka"
            value={postImage}
            onChange={(e) => setPostImage(e.target.value)}
            placeholder="Maksymalnie 1000 znaków"
            maxLength={1000}
          />
          <InputBox
            maxLength={255}
            label="Opis miniaturki"
            placeholder="Maksymalnie 255 znaków"
            value={postImageAlt}
            onChange={(e) => setPostImageAlt(e.target.value)}
          />
          <Textarea
            label="Krótki wstęp"
            value={postIntroduction}
            placeholder="Maksymalnie 1000 znaków"
            maxLength={1000}
            onChange={(e) => setPostIntroduction(e.target.value)}
          />
          <Textarea
            label="Zawartość postu"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <InputBox
            maxLength={255}
            label="Autor"
            placeholder="Maksymalnie 255 znaków"
            value={postAuthor}
            onChange={(e) => setPostAuthor(e.target.value)}
          />
          {postAction === "addNotPolish" && (
            <Select
              label="Język"
              value={postLanguage}
              onChange={(e) => setPostLanguage(e.target.value)}
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
          )}
          <Button
            title="Dodaj post"
            icon={mdiPlus}
            onClick={() => {
              const errorDuringAddingPost = () => {
                toast.error("Wystąpił błąd podczas dodawania postu");
              };
              const tryRequest = async (): Promise<void> => {
                !isMobile && toast.info("Przetwarzam żądanie");
                try {
                  const res: Response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/add-post?action=${
                      postAction === "addPolish"
                        ? "addPolishPost"
                        : "addNotPolishPost"
                    }`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: window.localStorage.token,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify({
                        content: postContent,
                        title: postTitle,
                        author: postAuthor,
                        introduction: postIntroduction,
                        img: postImage,
                        imgAlt: postImageAlt,
                        language:
                          postAction === "addNotPolish"
                            ? postLanguage
                            : undefined,
                        postID:
                          postAction === "addNotPolish"
                            ? selectedPostTitle
                            : undefined,
                      }),
                    }
                  );
                  const { status }: Response = res;
                  if (status === 200) {
                    !isMobile && toast.success("Dodałeś post");
                    setPostTitle("");
                    setPostContent("");
                    setPostAuthor("");
                    setPostIntroduction("");
                    setPostImage("");
                    setPostImageAlt("");
                    getPostsTitles();
                  } else {
                    !isMobile && errorDuringAddingPost();
                  }
                } catch (err) {
                  !isMobile && errorDuringAddingPost();
                }
              };
              if (postContent === "" || postTitle === "") {
                if (postTitle === "") {
                  !isMobile && toast.error("Tytuł postu nie może być pusty");
                }
                if (postContent === "") {
                  !isMobile &&
                    toast.error("Zawartość postu nie może być pusta");
                }
                return;
              }
              tryRequest();
            }}
          />
        </Form>
      </Section>
    </Page>
  );
};

export default AddPostPage;
