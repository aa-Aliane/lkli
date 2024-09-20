import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISigninForm, schema } from "./signin.types";
import { TextInput, PasswordInput } from "../../components/basic/inputs";
import { IButtonProps } from "../../components/basic/buttons/Button";

export const useFormProps = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninForm>({ resolver: zodResolver(schema) });

  const usernameProps = {
    label: "username",
    className: "form__field",
    input: (
      <TextInput
        register={register("username", {
          onChange: () => console.log("changes"),
        })}
      />
    ),
    error: errors.username?.message,
  };

  // password props
  const passwordProps = {
    label: "password",
    className: "form__field",
    input: (
      <PasswordInput
        register={register("password", {
          onChange: () => console.log("changes"),
        })}
      />
    ),
    error: errors.password?.message,
  };

  // submit button props
  const submitProps: IButtonProps = {
    text: "submit",
    type: "submit",
    icon: <span className="material-symbols-outlined">send</span>,
  };

  return { handleSubmit, usernameProps, passwordProps, submitProps };
};
