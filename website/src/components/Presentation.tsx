import React, { FC, useContext } from 'react';
import PresentationWrapper from './PresentationWrapper';
import PresentationBlock from "./PresentationBlock";
import GlobalContext from "../stores/globalStore";

interface PresentationProps { }

const Presentation: FC<PresentationProps> = (_props: PresentationProps): JSX.Element => {
  const { isDarkThemeDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher
  return (
    <PresentationWrapper>
      <PresentationBlock isDarkTheme={isDarkTheme} centered>
        <div className="presentation-content">
          <h2>ZSB Złotym Technikum 2018</h2>
          <img id="gold-medium-school-img" title="Złote technikum" src="/images/gold-medium-school.png" alt="Złote technikum" loading="lazy" width="200" height="200" />
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content">
          <h3>Adres szkoły:</h3>
          <div className="presentation-section">
            <div>ul. Świerklańska 42</div>
            <div>44-200 Rybnik</div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content">
          <h3>Telefon:</h3>
          <div className="presentation-section">
            <div>+32 42 222 79 (tel/fax)</div>
            <div>+32 42 227 96</div>
            <div>+32 42 261 00</div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content">
          <h3>Email:</h3>
          <div className="presentation-section">
            <div>zsbrybnik@gmail.com</div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content">
          <h3>Inspektor ochrony danych:</h3>
          <div className="presentation-section">
            <div>Joanna Moćko</div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content presentation-block-centered">
          <h3>Technikum akademickie</h3>
          <div className="presentation-section">
            <div>Posiadamy status techników akademickich następujących ośrodków:</div>
            <div className="presentation-section-img-block">
              <img className="presentation-img" src="/images/silesian-technical-university.png" alt="Politechnika Śląska" loading="lazy" width="50" height="50" />
              <div>Politechnika śląska</div>
            </div>
            <div className="presentation-section-img-block">
              <img className="presentation-img" src="/images/logo-cki.png" alt="Politechnika Śląska" loading="lazy" width="50" height="50" />
              <div>Centrum Kształcenia Inżynierów</div>
            </div>
            <div className="presentation-section-img-block">
              <img className="presentation-img" src="/images/logo-us.png" alt="Politechnika Śląska" loading="lazy" width="50" height="50" />
              <div>Uniwersytet śląski</div>
            </div>
            <div className="presentation-section-img-block">
              <img className="presentation-img" src="/images/wst-logo.png" alt="Wyższa szkoła techniczna" loading="lazy" width="50" height="50" />
              <div>Wyższa szkoła techniczna</div>
            </div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content presentation-block-centered">
          <h3>Projekty</h3>
          <div className="presentation-section">
            <div>Bierzemy udział w następujących projektach:</div>
            <div className="presentation-section-img-block">
              <img className="presentation-img" src="/images/eTwinning.png" alt="eTwinning" loading="lazy" width="50" height="50" />
              <div>eTwinning</div>
            </div>
            <div className="presentation-section-img-block">
              <img className="presentation-img" src="/images/erasmus.jpg" alt="Erasmus +" loading="lazy" width="50" height="50" />
              <div>Erasmus +</div>
            </div>
            <div className="presentation-section-img-block">
              <img className="presentation-img" src="/images/logo-zsb-project.png" alt="Konkurencyjność uczniów ZSB w Rybniku na rynku pracy" loading="lazy" width="50" height="50" />
              <div>Konkurencyjność uczniów ZSB w Rybniku na rynku pracy</div>
            </div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content presentation-block-centered">
          <h3>BIP</h3>
          <div className="presentation-section">
            <div>Biuletyn Informacji Publicznej:</div>
            <div className="presentation-section-img-block">
              <a href="http://zsb.bip.edukacja.rybnik.eu/" rel="noopener noreferrer" title="Biuletyn Informacji Publicznej"><img className="presentation-img" src="/images/bip.png" alt="Biuletyn Informacji Publicznej" loading="lazy" width="50" height="50" /></a>
            </div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content presentation-block-centered">
          <h3>Rybnicka Platofrma Poradnictwa Zawodowego</h3>
          <div className="presentation-section">
            <div>Rybnicka Platofrma Poradnictwa Zawodowego:</div>
            <div className="presentation-section-img-block">
              <a href="https://www.facebook.com/pages/category/Community/Rybnicka-Platforma-Poradnictwa-Zawodowego-187220987983602" rel="noopener noreferrer" title="Rybnicka Platofrma Poradnictwa Zawodowego"><img className="presentation-img" src="/images/rbkjobplatform.jpg" alt="Rybnicka Platofrma Poradnictwa Zawodowego" loading="lazy" width="50" height="50" /></a>
            </div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content presentation-block-centered">
          <h3>Copyright &copy; {new Date().getFullYear()}</h3>
          <div className="presentation-section">
            <div>Wszystkie materiały zamieszczone na stronie są własnością ZSB w Rybniku. Kopiowanie, rozpowszechnianie lub publikacja ich bez zgody autora jest zabronione!</div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content">
          <h3>Programiści:</h3>
          <div className="presentation-section">
            <div>Krzysztof Zawisła</div>
            <div>Borys Malinowski</div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content">
          <h3>Designerzy:</h3>
          <div className="presentation-section">
            <div>Krzysztof Zawisła</div>
            <div>Jakub Pawelec</div>
          </div>
        </div>
      </PresentationBlock>
      <PresentationBlock isDarkTheme={isDarkTheme}>
        <div className="presentation-content">
          <h3>Pomocnicy:</h3>
          <div className="presentation-section">
            <div>Allan Nowak</div>
            <div>Mateusz Perczak</div>
            <div>Wojtek Buczko</div>
            <div>Jakub Bawor</div>
          </div>
        </div>
      </PresentationBlock>
    </PresentationWrapper>
  );
};

export default Presentation;
