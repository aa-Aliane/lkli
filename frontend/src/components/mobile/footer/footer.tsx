import React, { useEffect } from "react";
import { list } from "../../basic/list";
import { Button } from "../../basic/buttons";
import { useNavigate } from "@tanstack/react-router";
import { useAccountQuery } from "../../../api/queries/accountQueries";

const footer = () => {
  const navigate = useNavigate({ from: "/_index" });

  const { data: accountInfo } = useAccountQuery();

  return (
    <div className="mobile-footer">
      <list.List className="mobile-menu">
        <list.Item className="mobile-menu__item">
          <Button
            className="btn btn--mb--menu"
            icon={<span className="material-symbols-outlined">home</span>}
            onClick={() => navigate({ to: "/" })}
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
            onClick={() => navigate({ to: "/" })}
          ></Button>
        </list.Item>
        <list.Item className="mobile-menu__item">
          <div
            className="profile-picture"
            onClick={() => {
              if (accountInfo) navigate({ to: "/account" });
              else navigate({ to: "/signin" });
            }}
          >
            <img src={accountInfo?.profile_picture} alt="profile-picture" />
          </div>
        </list.Item>
      </list.List>
    </div>
  );
};

export default footer;
