import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext, {
  GlobalContextCompleteValues,
  IsMobileDispatcher,
} from "../../contextes/globalContext";

interface InnerLinkProps {
  route: string;
  title: string;
  onlyForMobile?: boolean;
  onClick: () => void;
}

const InnerLink: FC<InnerLinkProps> = (
  { route, title, onlyForMobile, onClick }: InnerLinkProps,
): JSX.Element => {
  const { isMobileDispatcher }: GlobalContextCompleteValues = useContext(
    GlobalContext,
  );
  const [isMobile]: IsMobileDispatcher = isMobileDispatcher;
  return (
    <>
      {(onlyForMobile && isMobile) || !onlyForMobile
        ? <Link to={route} title={title} aria-label={title} onClick={onClick}>
          <div>{title}</div>
        </Link>
        : null}
    </>
  );
};

export default InnerLink;
