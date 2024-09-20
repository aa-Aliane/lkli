import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainLayout } from "../layouts";
import { Nav, NavMobile } from "../components/interface/nav";
import { Header } from "../components/interface/header";
import * as subheader from "../components/interface/subheader";
import { useRef } from "react";

const navChildren = () => {
  return (
    <>
      <Nav />
      <NavMobile />
      <Header />
      <subheader.Desktop />
    </>
  );
};

const Index = () => {
  const mainRef = useRef<HTMLElement | null>(null);
  return (
    <MainLayout navChildren={navChildren()}>
      <Outlet />
    </MainLayout>
  );
};

export const Route = createFileRoute("/_index")({
  component: Index,
});
