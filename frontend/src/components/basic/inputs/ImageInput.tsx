import React from "react";

export interface IProps {
  label: string;
  className: string;
  imageClassName: string;
  profilePicture: any;
  dataChanged: boolean;
  register: any;
}
const ImageInput = (props: IProps) => {
  const {
    label,
    className,
    imageClassName,
    dataChanged,
    profilePicture,
    register,
  } = props;

  return (
    <div className="img--container" data-changed={dataChanged}>
      <label className={className} htmlFor={label}>
        <img className={imageClassName} src={profilePicture} alt="" />
      </label>
      <input id={label} type="file" style={{ display: "none" }} {...register} />
    </div>
  );
};

export default ImageInput;
