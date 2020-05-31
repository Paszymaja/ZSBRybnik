import React, { FC } from 'react';
import Page from '../components/Page';

interface Error404Props { }

const Error404: FC<Error404Props> = (): JSX.Element => {
  return (
    <Page title="Error 404">xd</Page>
  );
};

export default Error404;