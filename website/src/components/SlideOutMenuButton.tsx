import React, { useContext } from 'react';
import SlideOutMenuButtonWrapper from './SlideOutMenuButtonWrapper';
import GlobalContext from '../stores/globalStore';
import { mdiBackburger, mdiMenu } from '@mdi/js';
import { iconSize } from '../other/variables';
import Icon from '@mdi/react';

const SlideOutMenuButton = () => {
  const { isSlideOutMenuOpenDispatcher } = useContext(GlobalContext);
  const [isSlideOutMenuOpen, setIsSlideOutMenuOpen] = isSlideOutMenuOpenDispatcher;
  return (
    <SlideOutMenuButtonWrapper onClick={() => setIsSlideOutMenuOpen(!isSlideOutMenuOpen)}>
      {isSlideOutMenuOpen ? <Icon path={mdiBackburger} size={iconSize} color="#fff" /> : <Icon path={mdiMenu} size={iconSize} color="#fff" />}
    </SlideOutMenuButtonWrapper>
  );
};

export default SlideOutMenuButton;