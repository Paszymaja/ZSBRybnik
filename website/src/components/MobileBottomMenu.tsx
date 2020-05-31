import React, { useContext } from 'react';
import MobileBottomMenuWrapper from './MobileBottomMenuWrapper';
import GlobalContext from '../stores/globalStore';
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import { mdiBookOpenPageVariant, mdiHome, mdiTableSearch } from '@mdi/js';
import { iconSize } from '../other/variables';

const MobileBottomMenu = () => {
  const { isDarkThemeDispatcher } = useContext(GlobalContext);
  const [isDarkTheme] = isDarkThemeDispatcher;
  return (
    <MobileBottomMenuWrapper isDarkTheme={isDarkTheme}>
      <a rel="noopener noreferrer" href="https://uonetplus.vulcan.net.pl/rybnik">
        <Icon path={mdiBookOpenPageVariant} size={iconSize} color="#fff" />
      </a>
      <Link to="/">
        <Icon path={mdiHome} size={iconSize} color="#fff" />
      </Link>
      <a rel="noopener noreferrer" href="https://planlekcjizsb.snowdropcurvemaster.now.sh">
        <Icon path={mdiTableSearch} size={iconSize} color="#fff" />
      </a>
    </MobileBottomMenuWrapper>
  );
};

export default MobileBottomMenu;