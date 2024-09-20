import React from "react";
import { useSubheaderStore } from "../components/interface/subheader/subheader.context";
import { Footer } from "../components/mobile/footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const { children } = props;
  const {
    setMenuToggle: setSubheaderMenuToggle,
    isOutsideMenu: isOutsideSubheaderMenu,
  } = useSubheaderStore();

  return (
    <div
      onClick={() => {
        if (isOutsideSubheaderMenu) setSubheaderMenuToggle(false);
      }}
    >
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
