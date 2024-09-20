import { createLazyFileRoute } from "@tanstack/react-router";
import { Signup } from "../pages/auth";

export const Route = createLazyFileRoute("/signup")({
  component: Index,
});

function Index() {
  return <Signup />;
}




