import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  &>* {
    a {
      display: block;
    }
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    &:nth-child(1) {
      margin-top: 0;
    }
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
`;

export default Form;
