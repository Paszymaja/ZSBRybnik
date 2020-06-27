import styled from 'styled-components';

interface PresentationBlockProps {
  centered?: boolean;
  isDarkTheme: boolean
}

const PresentationBlock = styled.div<PresentationBlockProps>`
  margin-top: 15px;
  background: ${({ isDarkTheme }) => isDarkTheme ? '#222' : '#eee'};
  padding: 15px;
  text-align: ${({ centered }) => centered ? 'center' : 'left'};
  &:first-child {
    margin-top: 0;
  }
`;

export default PresentationBlock;