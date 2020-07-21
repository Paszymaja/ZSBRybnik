import styled from "styled-components";

interface LoaderWrapperProps {
  width: string;
  height: string;
}

const LoaderWrapper = styled.div<LoaderWrapperProps>`
  width: ${({ width }: LoaderWrapperProps): string => width};
  height: ${({ height }: LoaderWrapperProps): string => height};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default LoaderWrapper;
