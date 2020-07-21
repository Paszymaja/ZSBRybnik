import styled from "styled-components";

interface SlideOutMenuCategoryChildrenWrapperProps {
  isHidden: boolean;
}

const SlideOutMenuCategoryChildrenWrapper = styled.div<
  SlideOutMenuCategoryChildrenWrapperProps
>`
  transform: ${(
  { isHidden }: SlideOutMenuCategoryChildrenWrapperProps,
): string => isHidden ? "scaleY(0)" : "scaleY(1)"};
  transition: all 5s;
  div {
    padding-left: 30px;
  }
`;

export default SlideOutMenuCategoryChildrenWrapper;
