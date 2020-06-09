import React, { FC } from 'react';
import TextBlock from './TextBlock';

interface MarkdownTextBlockProps {
  children: string;
}

const MarkdownTextBlock: FC<MarkdownTextBlockProps> = ({ children }, props: MarkdownTextBlockProps) => {
  return (
    <TextBlock value={children} {...props} />
  );
};

export default MarkdownTextBlock;