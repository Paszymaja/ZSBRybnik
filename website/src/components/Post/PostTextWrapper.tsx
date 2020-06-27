import styled from 'styled-components';

const PostTextWrapper = styled.div`
  margin-left: 15px;
  width: calc(100% - 160px);
  height: 150px;
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  margin: 0 15px;
  display: flex;
  flex-direction: column;
`;

export default PostTextWrapper;