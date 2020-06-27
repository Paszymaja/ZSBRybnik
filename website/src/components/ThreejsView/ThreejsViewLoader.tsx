import styled, { StyledComponent } from "styled-components";

interface ThreejsViewLoaderProps {}

type ThreejsViewLoaderType = StyledComponent<
  "div",
  any,
  ThreejsViewLoaderProps,
  never
>;

const ThreejsViewLoader: ThreejsViewLoaderType = styled.div<
  ThreejsViewLoaderProps
>`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default ThreejsViewLoader;
