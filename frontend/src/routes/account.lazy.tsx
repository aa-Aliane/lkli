import { createLazyFileRoute } from "@tanstack/react-router";
import { Account } from "../pages/auth";

export const Route = createLazyFileRoute("/account")({
  component: Index,
});

function Index() {
  return <Account />;
}
