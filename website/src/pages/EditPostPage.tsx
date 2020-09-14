import { FC, useEffect, useState } from "react";
import React from "react";
import Page from "../components/Page";
import Section from "../components/Section";
import Form from "../components/Form";
import Select from "../components/Select/Select";
import InputBox from "../components/InputBox/InputBox";
import Textarea from "../components/Textarea/Textarea";
import Button from "../components/Button/Button";
import { mdiPencil, mdiMinus } from "@mdi/js";

export interface EditPostPageProps {}

const EditPostPage: FC<EditPostPageProps> = (): JSX.Element => {
  const title: string = "Edytuj post";
  const [isPolishPost, setIsPolishPost] = useState(true);
  const [postsTitles, setPostsTitles] = useState([]);
  const [selectedPostTitle, setSelectedPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postIntroduction, setPostIntroduction] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postImageAlt, setPostImageAlt] = useState("");
  const [postAuthor, setPostAuthor] = useState("");
  const [postLanguage, setPostLanguage] = useState("");
  const getPostsTitles = () => {
    const tryRequest = async () => {
      try {
        const res: Response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/get-posts-titles`
        );
        const data = await res.json();
        setPostsTitles(data);
      } catch (err) {}
    };
    tryRequest();
  };
  useEffect((): void => {
    getPostsTitles();
  }, []);
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form>
          <Select
            label="Wybierz akcję"
            onChange={(e) => {
              const { value } = e.target;
              const isTrue: boolean = value === "true";
              setIsPolishPost(isTrue);
            }}
          >
            <option value="true">Edytuj post w języku polskim</option>
            <option value="false">Edytuj post w obcym języku</option>
          </Select>
          <Select
            label="Wybierz post do edycji"
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
          <InputBox
            label="Tytuł"
            value={postTitle}
            placeholder="Maksymalnie 50 znaków"
            maxLength={50}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <InputBox
            label="Miniaturka"
            value={postImage}
            onChange={(e) => setPostImage(e.target.value)}
          />
          <InputBox
            maxLength={30}
            label="Opis miniaturki"
            placeholder="Maksymalnie 30 znaków"
            value={postImageAlt}
            onChange={(e) => setPostImageAlt(e.target.value)}
          />
          <Textarea
            label="Krótki wstęp"
            value={postIntroduction}
            placeholder="Maksymalnie 255 znaków"
            maxLength={255}
            onChange={(e) => setPostIntroduction(e.target.value)}
          />
          <Textarea
            label="Zawartość postu"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <InputBox
            maxLength={30}
            label="Autor"
            value={postAuthor}
            onChange={(e) => setPostAuthor(e.target.value)}
          />
          {!isPolishPost && (
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
          <Button title="Edytuj post" icon={mdiPencil} onClick={() => {}} />
          <Button title="Usuń post" icon={mdiMinus} onClick={() => {}} />
        </Form>
      </Section>
    </Page>
  );
};

export default EditPostPage;
