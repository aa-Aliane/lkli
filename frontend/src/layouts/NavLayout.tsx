import React, { useEffect, useState, useRef } from "react";
import { Footer } from "../components/mobile/footer";
import { Nav, NavMobile } from "../components/interface/nav";
import { Header } from "../components/interface/header";
import * as subheader from "../components/interface/subheader";

interface NavLayoutProps {
  children: React.ReactNode;
}

const NavLayout: React.FC<NavLayoutProps> = (props: NavLayoutProps) => {
  const { children } = props;

  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (navRef.current) {
      console.log("shiasssss");
      if (currentScrollY >= lastScrollY.current) {
        console.log("scroll", currentScrollY, lastScrollY.current);
        // Scrolling down
        setIsSticky(true);
      } else {
        // Scrolling up
        const navTop = navRef.current.getBoundingClientRect().top;
        console.log("scroll", currentScrollY, lastScrollY.current);
        setIsSticky(false);
      }
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className={`top ${isSticky ? "down" : "up"}`} ref={navRef}>
        <Nav />
        <NavMobile />
        <Header />
      </div>
      <subheader.Desktop />
      <main className="mt-7">{children}</main>
      <Footer />
    </div>
  );
};

export default NavLayout;
