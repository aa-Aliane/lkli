import { createLazyFileRoute } from "@tanstack/react-router";
import { Home } from "../pages/home";
import { Feed } from "../components/interface/feed";

const Index = () => {
  return (
    <div className="p-2">
      <Home />
    </div>
  );
};

export const Route = createLazyFileRoute("/_index/home")({
  component: Index,
});
