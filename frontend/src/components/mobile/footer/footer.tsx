import React from "react";
import { list } from "../../basic/list";
import { Button } from "../../basic/buttons";
import { useNavigate } from "@tanstack/react-router";

const footer = () => {
  const navigate = useNavigate({ from: "/_index" });

  return (
    <div className="mobile-footer">
      <list.List className="mobile-menu">
        <list.Item className="mobile-menu__item">
          <Button
            className="btn btn--mb--menu"
            icon={<span className="material-symbols-outlined">home</span>}
            onClick={() => navigate({ to: "/home" })}
          ></Button>
        </list.Item>
        <list.Item className="mobile-menu__item">
          <Button
            className="btn btn--mb--menu"
            icon={<span className="material-symbols-outlined">search</span>}
          ></Button>
        </list.Item>
        <list.Item className="mobile-menu__item">
          <Button
            className="btn btn--mb--menu"
            icon={<span className="material-symbols-outlined">map</span>}
            onClick={() => navigate({ to: "/map" })}
          ></Button>
        </list.Item>
        <list.Item className="mobile-menu__item">
          <Button
            className="btn btn--mb--menu"
            icon={<span className="material-symbols-outlined">person</span>}
          ></Button>
        </list.Item>
      </list.List>
    </div>
  );
};

export default footer;
