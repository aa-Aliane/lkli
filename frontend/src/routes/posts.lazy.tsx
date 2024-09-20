import { createLazyFileRoute } from "@tanstack/react-router";
import { Books } from "../pages/posts";

export const Route = createLazyFileRoute("/posts")({
  component: Index,
});

function Index() {
  return <Books />;
}
