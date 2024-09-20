// Import necessary modules and components
import { Link } from "@tanstack/react-router";
import Logo from "../../logo";
import { Button } from "../../basic/buttons";
import Search from "./nav.search";
import NavMobile from "./NavMobile";
import { useGlobalStore } from "../../../context/global.context";
import { useWindowSize } from "@uidotdev/usehooks";

// Nav component
const Nav = () => {
  // State to manage mobile search visibility
  const { openMobileSearch, setMobileSearch, isOutsideSearch } =
    useGlobalStore();

  // Props for Auth component
  const authProps = {
    openMobileSearch,
  };

  const ws = useWindowSize();

  // Render component
  return (
    <div
      className="nav-container"
      onClick={() => {
        if (isOutsideSearch) setMobileSearch(false);
      }}
    >
      <nav className="nav" data-mobileSearch={openMobileSearch}>
        {/* Menu block */}
        <div className="nav__menu" data-mobileSearch={!openMobileSearch}>
          <Link className="a--nav" to="/">
            <Logo />
          </Link>
        </div>

        {/* Search block */}
        <Search />

        {/* Authentication block */}
        <div className="nav__auth" data-mobileSearch={!openMobileSearch}>
          <Link className="a--nav" to="/about">
            Qui sommes nous ?
          </Link>
          <Link className="btn btn--variant-1" to="/signin">
            <p>connexion</p>
          </Link>
          <Link className="btn btn--variant-2" to="/signup">
            <p>enregistrement</p>
          </Link>
          <Button
            className="btn btn--variant-0 outside"
            icon={<span className="material-symbols-outlined">person</span>}
            onClick={() => {}}
          />
        </div>
      </nav>
      {/* {ws?.width < 400 && <NavMobile />} */}
    </div>
  );
};

export default Nav;
