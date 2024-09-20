interface propsType {
  table: any;
  row: any;
}

const ButtonDeleteRow = (props: propsType) => {
  // props
  const { table, row } = props;

  const meta = table?.options.meta;

  // handlers
  const onClick = () => {
    console.log("row", row.index);
    meta?.removeRow(row.index);
  };

  return (
    <button className="btn btn--delete" type="button" onClick={onClick}>
      <span className="material-symbols-outlined">delete</span>
    </button>
  );
};

export default ButtonDeleteRow;
