import styled, { StyledComponent } from "styled-components";

interface PostImageProps {}

type PostImageType = StyledComponent<"div", any, PostImageProps, never>;

const PostImage: PostImageType = styled.div<PostImageProps>`
  img {
    height: 150px;
    width: 150px;
    object-fit: cover;
    vertical-align: middle;
  }
`;

export default PostImage;
