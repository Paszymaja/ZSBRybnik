import React, { FC } from 'react';
import TextBlockWrapper from './TextBlockWrapper';

interface TextBlockProps {
  translated?: boolean;
  value: string;
}

const TextBlock: FC<TextBlockProps> = ({ value }: TextBlockProps): JSX.Element => {
  return (
    <TextBlockWrapper>{value}</TextBlockWrapper>
  );
};

export default TextBlock;