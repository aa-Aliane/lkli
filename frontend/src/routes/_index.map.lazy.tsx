import { createLazyFileRoute } from "@tanstack/react-router";
import { Region } from "../components/interface/map/region";

const Index = () => {
  return <Region />;
};

export const Route = createLazyFileRoute("/_index/map")({
  component: Index,
});
