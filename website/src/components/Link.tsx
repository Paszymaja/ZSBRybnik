import React, { FC, useContext } from 'react';
import { mdiDownload, mdiShare } from '@mdi/js';
import Icon from '@mdi/react';
import GlobalContext from '../stores/globalStore';
import LinkWrapper from './LinkWrapper';
import LinkContentWrapper from './LinkContentWrapper';
import LinkText from './LinkText';
import { iconSize } from '../other/variables';
import { useTranslation } from 'react-i18next';

interface LinkProps {
  title: string;
  href: string;
  toDownload?: boolean;
  inNewCard?: boolean;
  isTranslated?: boolean;
}

const Link: FC<LinkProps> = ({ title, href, toDownload, inNewCard, isTranslated }: LinkProps): JSX.Element => {
  const { t } = useTranslation();
  const { isDarkThemeDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  const color: string = isDarkTheme ? '#fff' : '#111';
  const icon: string = toDownload === true ? mdiDownload : mdiShare;
  const fixedTitle: string = isTranslated ? t(title) : title;
  return (
    <LinkWrapper isDarkTheme={isDarkTheme} href={href} rel='noopener noreferrer' target={inNewCard === true ? "_blank" : ""} aria-label={title}>
      <LinkContentWrapper isDarkTheme={isDarkTheme}>
        <LinkText>
          <h3>{fixedTitle}</h3>
        </LinkText>
        <div>
          <Icon path={icon} size={iconSize} color={color} />
        </div>
      </LinkContentWrapper>
    </LinkWrapper>
  );
};

export default Link;
