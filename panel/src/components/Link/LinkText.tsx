import styled, { StyledComponent } from "styled-components";

interface LinkTextProps {}

type LinkTextType = StyledComponent<"div", any, LinkTextProps, never>;

const LinkText: LinkTextType = styled.div<LinkTextProps>`
  margin-bottom: 10px;
`;

export default LinkText;
