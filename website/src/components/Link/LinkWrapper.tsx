import styled from "styled-components";

interface LinkWrapperProps {
  isDarkTheme: boolean;
}

const LinkWrapper = styled.a<LinkWrapperProps>`
  text-decoration: none;
  color: ${({ isDarkTheme }) => isDarkTheme ? "#fff" : "#111"};
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

export default LinkWrapper;