import React from "react";
import { Button } from "../../basic/buttons";

interface IProps {
  data: any;
  toggleBio: Boolean;
  handleToggleBio: (e: any) => void;
}
const Artist = (props: IProps) => {
  const { data, toggleBio, handleToggleBio } = props;
  return (
    <>
      <p className="artist-name" data-hide={toggleBio}>
        {data?.artist.first_name}
      </p>

      <div className="bio" data-opened={toggleBio}>
        <p className="bio__text">{toggleBio && data?.artist.bio}</p>
        <Button
          className={`btn ${toggleBio ? "btn--variant-3" : "btn--variant-05"}`}
          onClick={handleToggleBio}
          icon={
            toggleBio ? (
              <span className="material-symbols-outlined">arrow_left_alt</span>
            ) : null
          }
        >
          {!toggleBio && <>lire la biographie</>}
        </Button>
      </div>

      <img
        className="artist-picture"
        src={data?.artist.profile_picture}
        data-hide={toggleBio}
      />
    </>
  );
};

export default Artist;
