import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { RootLayout } from "../layouts";

export const Route = createRootRoute({
  component: () => (
    <>
      <RootLayout>
        <Outlet />
        fgsdg
      </RootLayout>
      <TanStackRouterDevtools />
    </>
  ),
});
