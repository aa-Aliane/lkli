interface propsType {
  onClick: () => void;
}

const ButtonEditRow = (props: propsType) => {
  // props
  const { onClick } = props;

  return (
    <button className="btn btn--edit" type="button" onClick={onClick}>
      <span className="material-symbols-outlined">edit</span>
    </button>
  );
};

export default ButtonEditRow;
