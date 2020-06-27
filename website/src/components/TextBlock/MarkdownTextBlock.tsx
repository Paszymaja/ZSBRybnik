import React, { FC } from "react";
import TextBlock from "./TextBlock";

interface MarkdownTextBlockProps {
  children: string;
}

const MarkdownTextBlock: FC<MarkdownTextBlockProps> = (
  { children }: MarkdownTextBlockProps,
  props: MarkdownTextBlockProps,
): JSX.Element => {
  return (
    <TextBlock value={children} {...props} />
  );
};

export default MarkdownTextBlock;
