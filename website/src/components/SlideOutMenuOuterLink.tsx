import React, { FC } from "react";

interface OuterLinkProps {
  route: string;
  title: string;
}

const OuterLink: FC<OuterLinkProps> = ({ route, title }: OuterLinkProps): JSX.Element => {
  return (
    <a href={route} rel="noopener noreferrer" title={title} aria-label={title}>{title}</a>
  );
};

export default OuterLink;
