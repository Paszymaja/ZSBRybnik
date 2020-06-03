import React, { FC } from "react";
import { Link } from "react-router-dom";

interface InnerLinkProps {
  route: string;
  title: string;
}

const InnerLink: FC<InnerLinkProps> = ({ route, title }: InnerLinkProps): JSX.Element => {
  return (
    <Link to={route} title={title} aria-label={title}>
      <div>{title}</div>
    </Link>
  );
};

export default InnerLink;