import React, { FC } from "react";
import { Link } from "react-router-dom";

interface InnerLinkProps {
  route: string;
  title: string;
  onClick: () => void;
}

const InnerLink: FC<InnerLinkProps> = ({ route, title, onClick }: InnerLinkProps): JSX.Element => {
  return (
    <Link to={route} title={title} aria-label={title} onClick={onClick}>
      <div>{title}</div>
    </Link>
  );
};

export default InnerLink;