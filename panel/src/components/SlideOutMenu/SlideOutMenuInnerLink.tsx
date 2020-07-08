import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsMobileDispatcher,
  IsSlideOutMenuOpenDispatcher,
} from "../../contextes/globalContext";
import scrollTop from "../../other/scrollTop";

interface InnerLinkProps {
  route: string;
  title: string;
  onlyForMobile?: boolean;
}

const InnerLink: FC<InnerLinkProps> = (
  { route, title, onlyForMobile }: InnerLinkProps,
): JSX.Element => {
  const { isMobileDispatcher, isSlideOutMenuOpenDispatcher }:
    GlobalContextCompleteValues = useContext(
      GlobalContext,
    );
  const [, setIsSlideOutMenuOpen]: IsSlideOutMenuOpenDispatcher =
    isSlideOutMenuOpenDispatcher;
  const [isMobile]: IsMobileDispatcher = isMobileDispatcher;
  return (
    <>
      {(onlyForMobile && isMobile) || !onlyForMobile
        ? <Link
          to={route}
          title={title}
          aria-label={title}
          onClick={(): void => {
            scrollTop();
            setIsSlideOutMenuOpen(false);
          }}
        >
          <div>{title}</div>
        </Link>
        : null}
    </>
  );
};

export default InnerLink;
