import React, { useContext } from 'react';
import MobileUpsideMenuHeader from './MobileUpsideMenuHeader';
import GlobalContext from '../stores/globalStore';

const MobileUpsideMenu = () => {
  const { isDarkThemeDispatcher, titleDispatcher } = useContext(GlobalContext);
  const [isDarkThemeLocal] = isDarkThemeDispatcher;
  const [titleLocal] = titleDispatcher;
  return (
    <MobileUpsideMenuHeader isDarkTheme={isDarkThemeLocal}>
      {titleLocal.length <= 25 ? <span>{titleLocal}</span> : null}
    </MobileUpsideMenuHeader>
  );
};

export default MobileUpsideMenu;