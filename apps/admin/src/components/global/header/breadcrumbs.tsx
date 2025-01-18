import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb";
import Render from "@repo/ui/components/render";
import { Link, useLocation } from "@tanstack/react-router";
import { toSentenceCase } from "@repo/common";

function Breadcrumbs() {
  const { pathname } = useLocation();

  const paths = pathname.split("/");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <Render renderIf={pathname !== "/"}>
          {paths.slice(0, paths.length - 1).map((path) => {
            return (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <Render renderIf={path !== ""}>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="capitalize">
                        {toSentenceCase(path)}
                      </Link>
                    </BreadcrumbLink>
                  </Render>
                  <Render renderIf={path === ""}>
                    <BreadcrumbLink asChild>
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </Render>
                </BreadcrumbItem>
                <Render renderIf={paths.length - 1 > 0}>
                  <BreadcrumbSeparator className="hidden md:block" />
                </Render>
              </>
            );
          })}
          <Render renderIf={paths.length > 0 && paths[paths.length - 1] !== ""}>
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {toSentenceCase(paths[paths.length - 1])}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </Render>
        </Render>
        <Render renderIf={pathname === "/"}>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </Render>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
