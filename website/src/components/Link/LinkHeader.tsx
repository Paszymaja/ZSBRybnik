import styled, { StyledComponent } from "styled-components";

interface LinkHeaderProps {}

type LinkHeaderType = StyledComponent<"h3", {}, LinkHeaderProps, never>;

const LinkHeader: LinkHeaderType = styled.h3<LinkHeaderProps>`
  margin-bottom: 10px;
`;

export default LinkHeader;
