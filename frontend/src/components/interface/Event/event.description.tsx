import React from "react";

interface IProps {
  data: any;
}
const Description = (props: IProps) => {
  const { data } = props;
  return (
    <>
      <input type="checkbox" name="readmore" id="read-description" />
      <p className="description">{data?.description}</p>

      <label className="readmore btn btn--variant-3" htmlFor="read-description">
        <p>lire la suite</p>
        <span className="material-symbols-outlined">arrow_right_alt</span>
      </label>
    </>
  );
};

export default Description;
