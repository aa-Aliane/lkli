import { textInput } from "./action";

export interface ITextInputWithActionProps {
  register: any;
  value: string;
  actionText: string;
  displayAction: Boolean;
  inputClassName?: string;
  onChange?: (arg: any) => void;
  onClick?: (arg: any) => void;
}
const TextInputWithAction = (props: ITextInputWithActionProps) => {
  const { value, register, actionText, displayAction, onChange, onClick } = props;
  return (
    <textInput.Container className="text--action">
      <textInput.Input
        value={value}
        register={register}
        onChange={onChange}
      ></textInput.Input>
      <textInput.Action
        data-display={displayAction}
        onClick={onClick}
        className={"btn btn--create"}
        text={actionText}
        icon={<span className="material-symbols-outlined">add</span>}
      ></textInput.Action>
    </textInput.Container>
  );
};

export default TextInputWithAction;
