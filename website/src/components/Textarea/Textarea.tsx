import React, { FC } from "react";
import TextareaWrapper from "./TextareaWrapper";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: FC<TextareaProps> = (
  { ...rest }: TextareaProps,
): JSX.Element => {
  return <TextareaWrapper {...rest} />;
};

export default Textarea;
