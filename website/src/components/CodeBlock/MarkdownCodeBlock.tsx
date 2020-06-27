import React, { FC } from "react";
import CodeBlock from "./CodeBlock";

interface MarkdownCodeBlockProps {
  children: string;
  className: string;
}

const MarkdownCodeBlock: FC<MarkdownCodeBlockProps> = (
  { children, className }: MarkdownCodeBlockProps,
): JSX.Element => {
  let fixedLang: string;
  try {
    fixedLang = className.replace("lang-", "");
  } catch (err) {
    fixedLang = className;
  }
  return (
    <CodeBlock value={children} language={fixedLang} />
  );
};

export default MarkdownCodeBlock;
