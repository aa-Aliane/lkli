import { TextCell } from ".";
import { useState } from "react";

export interface IEditableCellProps {
  text: string;
  originalText?: string;
  type: "textarea" | "text";
  inputClassName?: string;
  onChange: (e: any) => void;
  onEditClick: () => void;
}

const EditableCell = (props: IEditableCellProps) => {
  const { text, type, inputClassName, onChange, onEditClick } = props;
  const [edit, setEdit] = useState(false);

  return (
    <div>
      {edit ? (
        <div className="flex flex--row">
          <TextCell
            initialValue={text}
            onChange={onChange}
            className={inputClassName}
            type={type}
          />
          <button className="btn" onClick={onEditClick}>
            ok
          </button>
        </div>
      ) : (
        <div onClick={() => setEdit(true)}>{text}</div>
      )}
    </div>
  );
};

export default EditableCell;
