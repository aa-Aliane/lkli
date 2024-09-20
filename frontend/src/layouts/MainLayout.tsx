import React from "react";
import { useSubheaderStore } from "../components/interface/subheader/subheader.context";
import { Footer } from "../components/mobile/footer";

interface MainLayoutProps {
  children: React.ReactNode;
  navChildren: JSX.Element;
}

const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const { children, navChildren } = props;
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
      <>{navChildren}</>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
