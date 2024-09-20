export interface ITextCellProps
  extends React.ComponentPropsWithoutRef<"input"> {
  onChange: (e: any) => void;
  initialValue?: string;
}

const TextCell = (props: ITextCellProps) => {
  //   props
  const { initialValue, type, className, onChange, ...otherProps } = props;

  //   rendering
  switch (type) {
    case "textarea":
      return (
        <textarea className={className} onChange={onChange}>
          {initialValue}
        </textarea>
      );
    default:
      return (
        <input
          type="text"
          value={initialValue}
          className={className}
          onChange={onChange}
          {...otherProps}
        />
      );
  }
};

export default TextCell;
