import styled from "styled-components";

const ThreejsViewWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  & > canvas {
    width: 100%;
    height: 100%;
  }
  @media all and (min-width: 768px) {
    width: 80%;
  }
`;

export default ThreejsViewWrapper;
