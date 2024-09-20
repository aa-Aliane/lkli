import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

const Index = () => {
  return (
    <div className="p-2">
      <Outlet />
    </div>
  );
};

export const Route = createLazyFileRoute("/_index/events")({
  component: Index,
});
