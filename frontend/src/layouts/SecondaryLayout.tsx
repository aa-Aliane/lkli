import React from "react";
import { Nav } from "../components/interface/nav";

interface SecondaryLayoutProps {
  children: React.ReactNode;
}

const SecondaryLayout: React.FC<SecondaryLayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main>{children}</main>
    </div>
  );
};

export default SecondaryLayout;
