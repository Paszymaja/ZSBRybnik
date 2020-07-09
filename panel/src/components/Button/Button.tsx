import React, { FC, useState, useEffect, useContext } from "react";
import Icon from "@mdi/react";
import { mdiUpload, mdiPlus, mdiMinus, mdiLogin } from "@mdi/js";
import "../../styles/action-button/action-button.css";
import GlobalContext, {
  GlobalContextCompleteValues,
} from "../../contextes/globalContext";
import { iconSize } from "../../other/variables";
import ButtonWrapper from "./ButtonWrapper";
import ButtonTextWrapper from "./ButtonTextWrapper";

interface ActionButtonProps {
  type: "submit" | "add" | "delete";
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  text: string;
}

const ActionButton: FC<ActionButtonProps> = (
  { type, onClick, text }: ActionButtonProps,
): JSX.Element => {
  const [iconPath, setIconPath] = useState("");
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkTheme] = isDarkThemeDispatcher;
  const color: string = isDarkTheme ? "#fff" : "#111";
  useEffect(() => {
    if (type === "submit") {
      setIconPath(mdiUpload);
    } else if (type === "add") {
      setIconPath(mdiPlus);
    } else if (type === "delete") {
      setIconPath(mdiMinus);
    } else if (type === "login") {
      setIconPath(mdiLogin);
    }
  }, [type]);
  return (
    <ButtonWrapper
      isDarkTheme={isDarkTheme}
      aria-label={text}
      onClick={onClick}
    >
      <ButtonTextWrapper>
        <h3>{text}</h3>
      </ButtonTextWrapper>
      <div>
        <Icon path={iconPath} size={iconSize} color={color} />
      </div>
    </ButtonWrapper>
  );
};

export default ActionButton;
