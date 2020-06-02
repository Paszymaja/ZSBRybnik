import styled from 'styled-components';

const PresentationWrapper = styled.div`
  display: none;
  word-wrap: break-word;
  @media all and (min-width: 768px) {
    text-align: center;
    display: block !important;
    width: calc(25% - 30px);
    margin: 15px 15px auto auto;
  }
`;

export default PresentationWrapper;