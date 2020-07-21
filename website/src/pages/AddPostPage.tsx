import { FC, useEffect } from "react";
import React from "react";
import Page from "../components/Page";
import { useHistory } from "react-router-dom";
import subscribeGoogleAnalytics from "../other/subscribeGoogleAnalytics";
import { mdiPlus } from "@mdi/js";
import { toast } from "react-toastify";
import Button from "../components/Button/Button";

interface AddPostPageProps {}

const AddPostPage: FC<AddPostPageProps> = (): JSX.Element => {
  const history = useHistory();
  const title: string = "Dodaj post";
  useEffect((): void => {
    subscribeGoogleAnalytics(history);
  }, [history]);
  return (
    <Page title={title}>
      <h2>{title}:</h2>
      <Button
        title="Dodaj post"
        icon={mdiPlus}
        onClick={() => {
          toast.info("Przetwarzam rządanie", {
            position: "bottom-right",
          });
          setTimeout(() =>
            toast.success("Dodałeś post!", {
              position: "bottom-right",
            }), 3000);
        }}
      />
    </Page>
  );
};

export default AddPostPage;
