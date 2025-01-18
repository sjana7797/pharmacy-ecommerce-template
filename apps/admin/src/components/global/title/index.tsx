import Render from "@repo/ui/components/render";
import type { ReactNode } from "react";

type Props = {
  title: string;
  actionsBar?: ReactNode;
};

function PageTitle({ title, actionsBar }: Props) {
  return (
    <div className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <Render renderIf={!!actionsBar}>{actionsBar}</Render>
    </div>
  );
}

export default PageTitle;
