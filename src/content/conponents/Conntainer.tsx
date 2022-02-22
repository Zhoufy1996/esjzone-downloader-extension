import { PropsWithChildren } from 'react';

const Container = ({ children }:PropsWithChildren<{}>) => (
  <div>
    {children}
  </div>
);

export default Container;
