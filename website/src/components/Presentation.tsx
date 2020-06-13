import React, { FC, useContext } from "react";
import PresentationWrapper from "./PresentationWrapper";
import PresentationBlock from "./PresentationBlock";
import GlobalContext from "../stores/globalStore";
import PresentationSection from "./PresentationSection";
import PresentationImageBlock from "./PresentationImageBlock";
import PresentationContentFitImageBlock from "./PresentationContentFitImageBlock";
import PresentationImageSection from "./PresentationImageSection";
import Gallery from "./Gallery";

interface PresentationProps {}

const Presentation: FC<PresentationProps> = (
  _props: PresentationProps,
): JSX.Element => {
  const { isDarkThemeDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  return (
    <PresentationWrapper>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <div>
          <h2>ZSB Złotym Technikum 2018</h2>
          <PresentationContentFitImageBlock
            title="Złote technikum"
            src="/images/gold-medium-school.png"
            alt="Złote technikum"
            loading="lazy"
            width="200"
            height="200"
          />
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div>
          <h3>Dyplomy i certyfikaty:</h3>
          <PresentationSection>
            <Gallery
              sources={[
                "https://www.youtube.com/watch?v=jkAGnIgMCQQ",
                "https://www.youtube.com/watch?v=8gi2wEVWu3U",
                "/images/logo.png",
              ]}
            />
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div>
          <h3>Adres szkoły:</h3>
          <PresentationSection>
            <div>ul. Świerklańska 42</div>
            <div>44-200 Rybnik</div>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div>
          <h3>Telefon:</h3>
          <PresentationSection>
            <div>+32 42 222 79 (tel/fax)</div>
            <div>+32 42 227 96</div>
            <div>+32 42 261 00</div>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div>
          <h3>Email:</h3>
          <PresentationSection>
            <div>zsbrybnik@gmail.com</div>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div>
          <h3>Inspektor ochrony danych:</h3>
          <PresentationSection>
            <div>Joanna Moćko</div>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <div>
          <h3>Technikum akademickie</h3>
          <PresentationSection>
            <div>
              Posiadamy status techników akademickich następujących ośrodków:
            </div>
            <PresentationImageSection>
              <PresentationImageBlock
                src="/images/silesian-technical-university.png"
                alt="Politechnika Śląska"
                loading="lazy"
                width="50"
                height="50"
              />
              <div>Politechnika śląska</div>
            </PresentationImageSection>
            <PresentationImageSection>
              <PresentationImageBlock
                src="/images/logo-cki.png"
                alt="Politechnika Śląska"
                loading="lazy"
                width="50"
                height="50"
              />
              <div>Centrum Kształcenia Inżynierów</div>
            </PresentationImageSection>
            <PresentationImageSection>
              <PresentationImageBlock
                src="/images/logo-us.png"
                alt="Politechnika Śląska"
                loading="lazy"
                width="50"
                height="50"
              />
              <div>Uniwersytet śląski</div>
            </PresentationImageSection>
            <PresentationImageSection>
              <PresentationImageBlock
                src="/images/wst-logo.png"
                alt="Wyższa szkoła techniczna"
                loading="lazy"
                width="50"
                height="50"
              />
              <div>Wyższa szkoła techniczna</div>
            </PresentationImageSection>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <div>
          <h3>Projekty</h3>
          <PresentationSection>
            <div>Bierzemy udział w następujących projektach:</div>
            <PresentationImageSection>
              <PresentationImageBlock
                src="/images/eTwinning.png"
                alt="eTwinning"
                loading="lazy"
                width="50"
                height="50"
              />
              <div>eTwinning</div>
            </PresentationImageSection>
            <PresentationImageSection>
              <PresentationImageBlock
                src="/images/erasmus.jpg"
                alt="Erasmus +"
                loading="lazy"
                width="50"
                height="50"
              />
              <div>Erasmus +</div>
            </PresentationImageSection>
            <PresentationImageSection>
              <PresentationImageBlock
                src="/images/logo-zsb-project.png"
                alt="Konkurencyjność uczniów ZSB w Rybniku na rynku pracy"
                loading="lazy"
                width="50"
                height="50"
              />
              <div>Konkurencyjność uczniów ZSB w Rybniku na rynku pracy</div>
            </PresentationImageSection>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <div>
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
                  src="/images/bip.png"
                  alt="Biuletyn Informacji Publicznej"
                  loading="lazy"
                  width="50"
                  height="50"
                />
              </a>
            </PresentationImageSection>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <div>
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
                  src="/images/rbkjobplatform.jpg"
                  alt="Rybnicka Platofrma Poradnictwa Zawodowego"
                  loading="lazy"
                  width="50"
                  height="50"
                />
              </a>
            </PresentationImageSection>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <div>
          <h3>ZSB Rybnik &copy; {new Date().getFullYear()}</h3>
          <PresentationSection>
            <div>
              Wszystkie materiały zamieszczone na stronie są własnością ZSB w
              Rybniku. Kopiowanie, rozpowszechnianie lub publikacja ich bez
              zgody autora jest zabronione!
            </div>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div>
          <h3>Programiści:</h3>
          <PresentationSection>
            <div>Krzysztof Zawisła</div>
            <div>Borys Malinowski</div>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div>
          <h3>Designerzy:</h3>
          <PresentationSection>
            <div>Krzysztof Zawisła</div>
            <div>Jakub Pawelec</div>
          </PresentationSection>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div>
          <h3>Pomocnicy:</h3>
          <PresentationSection>
            <div>Allan Nowak</div>
            <div>Mateusz Perczak</div>
            <div>Jakub Bawor</div>
            <div>Wojtek Buczko</div>
          </PresentationSection>
        </div>
      </PresentationBlock>
    </PresentationWrapper>
  );
};

export default Presentation;
