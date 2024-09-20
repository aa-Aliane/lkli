import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISigninForm, schema } from "./signin.types";
import { TextInput, PasswordInput } from "../../components/basic/inputs";
import { useSigninMutation } from "../../api/queries/authQueries";

export const useFormProps = () => {
  const { mutate } = useSigninMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninForm>({ resolver: zodResolver(schema) });

  // Submit handler function
  const onSubmit = (data: ISigninForm) => {
    mutate(data);
  };

  // formProps
  const formProps = {
    onSubmit: handleSubmit(onSubmit),
  };

  // username props
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

  return { formProps, usernameProps, passwordProps };
};
