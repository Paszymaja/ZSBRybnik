import { FC, useEffect, useState, useContext } from "react";
import React from "react";
import Page from "../components/Page";
import { useHistory } from "react-router-dom";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import { mdiPlus } from "@mdi/js";
import { toast } from "react-toastify";
import Button from "../components/Button/Button";
import Textarea from "../components/Textarea/Textarea";
import Section from "../components/Section";
import Form from "../components/Form";
import GlobalContext from "../contextes/globalContext";

interface AddPostPageProps {}

const AddPostPage: FC<AddPostPageProps> = (): JSX.Element => {
  const history = useHistory();
  const title: string = "Dodaj post";
  const [postContent, setPostContent] = useState("");
  const { isMobileDispatcher } = useContext(
    GlobalContext,
  );
  const [isMobile] = isMobileDispatcher;
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Section>
        <Form>
          <Textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <Button
            title="Dodaj post"
            icon={mdiPlus}
            onClick={() => {
              const errorDuringAddingPost = () => {
                toast.error("Wystąpił błąd podczas dodawania postu", {
                  position: "bottom-right",
                });
              };
              const tryRequest = async (): Promise<void> => {
                !isMobile && toast.info("Przetwarzam żądanie", {
                  position: "bottom-right",
                });
                const controller: AbortController = new AbortController();
                const { signal }: AbortController = controller;
                try {
                  const res: Response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/add-post`,
                    {
                      method: "POST",
                      headers: {
                        "Authorization": window.localStorage.token,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      signal: signal,
                      body: JSON.stringify({
                        content: postContent,
                      }),
                    },
                  );
                  const { status }: Response = res;
                  if (status === 200) {
                    !isMobile && toast.success("Dodałeś post", {
                      position: "bottom-right",
                    });
                  } else {
                    !isMobile && errorDuringAddingPost();
                  }
                } catch (err) {
                  !isMobile && errorDuringAddingPost();
                  controller.abort();
                }
              };
              if (postContent.length > 0) {
                tryRequest();
              } else {
                !isMobile && toast.error("Zawartość postu nie może być pusta", {
                  position: "bottom-right",
                });
              }
            }}
          />
        </Form>
      </Section>
    </Page>
  );
};

export default AddPostPage;
