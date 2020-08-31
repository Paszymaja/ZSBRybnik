import styled, { css } from "styled-components";

interface LoaderWrapperProps {
  width: string;
  height: string;
  customStyle?: string;
}

const LoaderWrapper = styled.div<LoaderWrapperProps>`
  width: ${({ width }: LoaderWrapperProps): string => width};
  height: ${({ height }: LoaderWrapperProps): string => height};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${({ customStyle }) =>
    customStyle &&
    css`
      ${customStyle}
    `}
`;

export default LoaderWrapper;
