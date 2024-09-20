import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { MainLayout, RootLayout } from "../layouts";

export const Route = createRootRoute({
  component: () => (
    <>
      <RootLayout>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </RootLayout>
      <TanStackRouterDevtools />
    </>
  ),
});
