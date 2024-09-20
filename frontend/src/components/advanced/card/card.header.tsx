import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  date?: string;
  username: string;
  avatar: string;
  location: string;
}
const Header = (props: IProps) => {
  const { username, avatar, location, date, ...otherProps } = props;
  return (
    <div {...otherProps}>
      <div className="profile">
        <img src={avatar} alt="avatar" />
        <p>{username}</p>
      </div>
      {date && <div className="header__date">{date}</div>}
      <div className="flex flex--column flex--center ">
        <div className="flex flex--center">
          <span className="material-symbols-outlined">location_on</span>
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
