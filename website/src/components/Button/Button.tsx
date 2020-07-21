import React, { FC, useContext } from "react";
import Icon from "@mdi/react";
import { iconSize } from "../../other/variables";
import GlobalContext, {
  GlobalContextCompleteValues,
} from "../../contextes/globalContext";
import ButtonWrapper from "./ButtonWrapper";
import ButtonTextWrapper from "./ButtonTextWrapper";

interface ButtonProps {
  icon: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Button: FC<ButtonProps> = (
  { icon, title, onClick }: ButtonProps,
): JSX.Element => {
  const { isDarkThemeDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isDarkTheme] = isDarkThemeDispatcher;
  const iconColor = isDarkTheme ? "#fff" : "#111";
  return (
    <ButtonWrapper
      onClick={onClick}
      isDarkTheme={isDarkTheme}
      aria-label={title}
      title={title}
    >
      <ButtonTextWrapper>{title}</ButtonTextWrapper>
      <div>
        <Icon path={icon} size={iconSize} color={iconColor} />
      </div>
    </ButtonWrapper>
  );
};

export default Button;
