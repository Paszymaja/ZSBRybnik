import React, { FC } from "react";
import TextareaWrapper from "./TextareaWrapper";
import Label from "../Label";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: FC<TextareaProps> = (
  { label, ...rest }: TextareaProps,
): JSX.Element => {
  return (
    <div>
      <Label>{label}</Label>
      <TextareaWrapper {...rest} />
    </div>
  );
};

export default Textarea;
