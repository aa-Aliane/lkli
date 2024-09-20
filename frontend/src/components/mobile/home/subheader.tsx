import React from "react";
import SubheaderLayout from "../../../layouts/mobile/mb-subheader";
import { list } from "../../basic/list";
import { Button } from "../../basic/buttons";

const SubheaderMB = () => {
  return (
    <SubheaderLayout>
      <list.List className="list--hz clr-neutral-100 subheader-mb-container">
        <list.Item>
          <Button className="btn btn--mb--sh" data-selected={true}>
            Hottt
          </Button>
        </list.Item>
        <list.Item>
          <Button className="btn btn--mb--sh">Nouveauté</Button>
        </list.Item>
      </list.List>
    </SubheaderLayout>
  );
};

export default SubheaderMB;
