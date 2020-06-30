import React, { useContext, FC } from "react";
import MobileUpsideMenuHeader from "./MobileUpsideMenuHeader";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsDarkThemeDispatcher,
  TitleDispatcher,
} from "../../stores/globalStore";

interface MobileUpsideMenuProps {}

const MobileUpsideMenu: FC<MobileUpsideMenuProps> = (): JSX.Element => {
  const { isDarkThemeDispatcher, titleDispatcher }:
    GlobalContextCompleteValues = useContext(GlobalContext);
  const [isDarkThemeLocal]: IsDarkThemeDispatcher = isDarkThemeDispatcher;
  const [titleLocal]: TitleDispatcher = titleDispatcher;
  return (
    <MobileUpsideMenuHeader isDarkTheme={isDarkThemeLocal}>
      {titleLocal.length <= 25 ? <span>{titleLocal}</span> : null}
    </MobileUpsideMenuHeader>
  );
};

export default MobileUpsideMenu;