import React from "react";
import { Button } from "../../basic/buttons";

const Reservation = () => {
  return (
    <>
      <p>n'attendez plus et reserver un ticket</p>
      <Button
        className="btn btn--variant-ticket"
        icon={
          <span className="material-symbols-outlined">confirmation_number</span>
        }
      >
        Reservation
      </Button>
    </>
  );
};

export default Reservation;
