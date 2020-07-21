import React, {
  FC,
  InputHTMLAttributes,
} from "react";
import InputBoxLabel from "./InputBoxLabel";
import InputBoxInput from "./InputBoxInput";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputBox: FC<InputBoxProps> = (
  { label, ...rest }: InputBoxProps,
): JSX.Element => {
  return (
    <div>
      <InputBoxLabel>{label}</InputBoxLabel>
      <InputBoxInput {...rest} />
    </div>
  );
};

export default InputBox;
