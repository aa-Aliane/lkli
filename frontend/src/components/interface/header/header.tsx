import React, { useRef } from "react";
import { list } from "../../basic/list";
import { Button } from "../../basic/buttons";
import { useCategoriesQuery } from "../feed/queries/categories/categories.queries";
import { useEventsStore } from "../../../context/events/events.context";
import Cats from "./header.cats";
import {
  ICat,
  useCatsStore,
} from "../../../context/events/events.cats.context";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header flex flex--align-center">
        <Cats />
      </div>
    </div>
  );
};

export default Header;
