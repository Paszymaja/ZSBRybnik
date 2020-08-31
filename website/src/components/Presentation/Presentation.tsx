import React, { FC, useContext } from "react";
import PresentationWrapper from "./PresentationWrapper";
import PresentationBlock from "./PresentationBlock";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
} from "../../contextes/globalContext";
import PresentationSection from "./PresentationSection";
import PresentationImageBlock from "./PresentationImageBlock";
import PresentationContentFitImageBlock from "./PresentationContentFitImageBlock";
import PresentationImageSection from "./PresentationImageSection";
import Gallery from "../Gallery/Gallery";
import { SourceType } from "fslightbox-react";
import { useImage } from "react-image";

interface PresentationProps {}

const Presentation: FC<PresentationProps> = (): JSX.Element => {
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext
  );
  const [isDarkTheme]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const { src: goldMediumSchoolSrc } = useImage({
    srcList: [
      `${process.env.REACT_APP_CDN_URL}/images/gold-medium-school.webp`,
      `${process.env.REACT_APP_CDN_URL}/images/gold-medium-school.png`,
    ],
  });
  const { src: silesianTechnicalUniversityImgSrc } = useImage({
    srcList: [
      `${process.env.REACT_APP_CDN_URL}/images/silesian-technical-university.webp`,
      `${process.env.REACT_APP_CDN_URL}/images/silesian-technical-university.png`,
    ],
  });
  const { src: logoCKIImgSrc } = useImage({
    srcList: [
      `${process.env.REACT_APP_CDN_URL}/images/logo-cki.webp`,
      `${process.env.REACT_APP_CDN_URL}/images/logo-cki.png`,
    ],
  });
  const logoUSImg: string = `${process.env.REACT_APP_CDN_URL}/images/logo-us.webp`;
  const logoWSTImg: string = `${process.env.REACT_APP_CDN_URL}/images/wst-logo.webp`;
  const logoEtwinImg: string = `${process.env.REACT_APP_CDN_URL}/images/logo-etwin.webp`;
  const logoErasmusImg: string = `${process.env.REACT_APP_CDN_URL}/images/erasmus.webp`;
  const logoZSBProjectImg: string = `${process.env.REACT_APP_CDN_URL}/images/logo-zsb-project.webp`;
  const logoBIPImg: string = `${process.env.REACT_APP_CDN_URL}/images/bip.webp`;
  const rbkjobPlatform: string = `${process.env.REACT_APP_CDN_URL}/images/rbkjobplatform.webp`;
  const galleryCerts: string[] = [
    `${process.env.REACT_APP_CDN_URL}/images/cert1.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert2.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert3.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert4.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert5.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert6.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert7.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert8.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert9.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert10.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert11.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert12.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert13.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert14.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert15.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert16.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert17.jpg`,
    `${process.env.REACT_APP_CDN_URL}/images/cert18.jpg`,
  ];
  const galleryTypes: SourceType[] = [
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
    "image",
  ];
  return (
    <PresentationWrapper>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <h2>ZSB Złotym Technikum 2018</h2>
        <a
          href="http://technika.perspektywy.pl/2018/"
          rel="noopener noreferrer"
          title="Złote technikum"
        >
          <PresentationContentFitImageBlock
            title="Złote technikum"
            src={goldMediumSchoolSrc}
            alt="Złote technikum"
            loading="lazy"
            width="200"
            height="200"
          />
        </a>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <h3>Dyplomy i certyfikaty:</h3>
        <PresentationSection>
          <Gallery sources={galleryCerts} types={galleryTypes} />
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <h3>Adres szkoły:</h3>
        <PresentationSection>
          <div>ul. Świerklańska 42</div>
          <div>44-200 Rybnik</div>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <h3>Telefon:</h3>
        <PresentationSection>
          <div>+32 42 222 79 (tel/fax)</div>
          <div>+32 42 227 96</div>
          <div>+32 42 261 00</div>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <h3>Email:</h3>
        <PresentationSection>
          <div>zsbrybnik@gmail.com</div>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <h3>Inspektor ochrony danych:</h3>
        <PresentationSection>
          <div>Joanna Moćko</div>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <h3>Technikum akademickie</h3>
        <PresentationSection>
          <div>
            Posiadamy status techników akademickich następujących ośrodków:
          </div>
          <PresentationImageSection>
            <PresentationImageBlock
              src={silesianTechnicalUniversityImgSrc}
              alt="Politechnika Śląska"
              title="Politechnika Śląska"
              loading="lazy"
              width="50"
              height="50"
            />
            <div>Politechnika śląska</div>
          </PresentationImageSection>
          <PresentationImageSection>
            <PresentationImageBlock
              src={logoCKIImgSrc}
              alt="Centrum Kształcenia Inżynierów"
              title="Centrum Kształcenia Inżynierów"
              loading="lazy"
              width="50"
              height="50"
            />
            <div>Centrum Kształcenia Inżynierów</div>
          </PresentationImageSection>
          <PresentationImageSection>
            <PresentationImageBlock
              src={logoUSImg}
              alt="Uniwersytet śląski"
              title="Uniwersytet śląski"
              loading="lazy"
              width="50"
              height="50"
            />
            <div>Uniwersytet śląski</div>
          </PresentationImageSection>
          <PresentationImageSection>
            <PresentationImageBlock
              src={logoWSTImg}
              alt="Wyższa szkoła techniczna"
              title="Wyższa szkoła techniczna"
              loading="lazy"
              width="50"
              height="50"
            />
            <div>Wyższa szkoła techniczna</div>
          </PresentationImageSection>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <h3>Projekty</h3>
        <PresentationSection>
          <div>Bierzemy udział w następujących projektach:</div>
          <PresentationImageSection>
            <PresentationImageBlock
              src={logoEtwinImg}
              alt="eTwinning"
              title="eTwinning"
              loading="lazy"
              width="50"
              height="50"
            />
            <div>eTwinning</div>
          </PresentationImageSection>
          <PresentationImageSection>
            <PresentationImageBlock
              src={logoErasmusImg}
              alt="Erasmus +"
              title="Erasmus +"
              loading="lazy"
              width="50"
              height="50"
            />
            <div>Erasmus +</div>
          </PresentationImageSection>
          <PresentationImageSection>
            <PresentationImageBlock
              src={logoZSBProjectImg}
              alt="Konkurencyjność uczniów ZSB w Rybniku na rynku pracy"
              title="Konkurencyjność uczniów ZSB w Rybniku na rynku pracy"
              loading="lazy"
              width="50"
              height="50"
            />
            <div>Konkurencyjność uczniów ZSB w Rybniku na rynku pracy</div>
          </PresentationImageSection>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <h3>BIP</h3>
        <PresentationSection>
          <div>Biuletyn Informacji Publicznej:</div>
          <PresentationImageSection>
            <a
              href="http://zsb.bip.edukacja.rybnik.eu/"
              rel="noopener noreferrer"
              title="Biuletyn Informacji Publicznej"
            >
              <PresentationImageBlock
                src={logoBIPImg}
                alt="Biuletyn Informacji Publicznej"
                loading="lazy"
                width="50"
                height="50"
              />
            </a>
          </PresentationImageSection>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <h3>Rybnicka Platofrma Poradnictwa Zawodowego</h3>
        <PresentationSection>
          <div>Rybnicka Platofrma Poradnictwa Zawodowego:</div>
          <PresentationImageSection>
            <a
              href="https://www.facebook.com/pages/category/Community/Rybnicka-Platforma-Poradnictwa-Zawodowego-187220987983602"
              rel="noopener noreferrer"
              title="Rybnicka Platofrma Poradnictwa Zawodowego"
            >
              <PresentationImageBlock
                src={rbkjobPlatform}
                alt="Rybnicka Platofrma Poradnictwa Zawodowego"
                loading="lazy"
                width="50"
                height="50"
              />
            </a>
          </PresentationImageSection>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <h3>ZSB Rybnik &copy; {new Date().getFullYear()}</h3>
        <PresentationSection>
          <div>
            Wszystkie materiały zamieszczone na stronie są własnością ZSB w
            Rybniku. Kopiowanie, rozpowszechnianie lub publikacja ich bez zgody
            autora jest zabronione!
          </div>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <h3>Programiści:</h3>
        <PresentationSection>
          <div>Krzysztof Zawisła</div>
          <div>Borys Malinowski</div>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <h3>Designerzy:</h3>
        <PresentationSection>
          <div>Krzysztof Zawisła</div>
          <div>Jakub Pawelec</div>
        </PresentationSection>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <h3>Pomocnicy:</h3>
        <PresentationSection>
          <div>Allan Nowak</div>
          <div>Mateusz Perczak</div>
          <div>Jakub Bawor</div>
          <div>Wojtek Buczko</div>
        </PresentationSection>
      </PresentationBlock>
    </PresentationWrapper>
  );
};

export default Presentation;
