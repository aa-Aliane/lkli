import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return <div className="root">{children}</div>;
};

export default RootLayout;
