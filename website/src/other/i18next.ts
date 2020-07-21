import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
import { rootElement } from "../index";

type InitTranslations = () => Promise<void>;
type Loader = HTMLElement | null;

const initTranslations: InitTranslations = async (): Promise<void> => {
  await i18n.use(initReactI18next).use(detector).use(backend)
    .init(
      ({
        load: "languageOnly",
        backend: {
          loadPath: "/locales/{{lng}}.json",
        },
        fallbackLng: "pl",
        interpolation: {
          escapeValue: false,
        },
      }),
    );
  const loader: Loader = document.querySelector("#loader");
  loader!.remove();
  document.body.style.overflow = "auto";
  rootElement!.style.display = "block";
};

export default initTranslations;
