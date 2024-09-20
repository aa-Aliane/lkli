import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainLayout, NavLayout } from "../layouts";

import { useRef } from "react";
import { Feed } from "../components/interface/feed";

const Index = () => {
  const mainRef = useRef<HTMLElement | null>(null);
  return (
    <NavLayout>
      <Feed />
    </NavLayout>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
