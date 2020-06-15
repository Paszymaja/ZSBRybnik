import styled from "styled-components";

const EmbedWrapper = styled.div`
  overflow: auto;
  z-index: 1;
  position: relative;
  text-align: center;
  * {
    width: 100% !important;
    max-width: 100% !important;
    overflow: hidden;
    margin: 0 auto !important;
  }
`;

export default EmbedWrapper;
