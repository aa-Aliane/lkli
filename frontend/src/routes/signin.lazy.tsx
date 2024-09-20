import { createLazyFileRoute } from "@tanstack/react-router";
import { Signin } from "../pages/auth";

export const Route = createLazyFileRoute("/signin")({
  component: Index,
});

function Index() {
  return <Signin />;
}
