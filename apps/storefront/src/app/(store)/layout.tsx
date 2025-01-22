import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function StoreLayout({ children }: Props) {
  return <div>{children}</div>;
}

export default StoreLayout;
