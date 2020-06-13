import React, { FC } from "react";
import { Prism } from "react-syntax-highlighter";

interface CodeBlockProps {
  value: string;
  language: string;
}

const CodeBlock: FC<CodeBlockProps> = (
  { value, language }: CodeBlockProps,
): JSX.Element => {
  return (
    <Prism language={language}>
      {value}
    </Prism>
  );
};

export default CodeBlock;
