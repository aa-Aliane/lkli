import { useForm } from "react-hook-form";
import { ISignupForm } from "./signup.types";
import { TextInput, PasswordInput } from "../../components/basic/inputs";
import { IButtonProps } from "../../components/basic/buttons/Button";

export const useFormProps = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>({});

  // // form props
  // const formProps: IFormProps = {
  //   className: "form",
  //   title: "signin",
  // };

  // fields props
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

  // firstName props
  const firstNameProps = {
    label: "firstName",
    className: "form__field",
    input: (
      <TextInput
        register={register("firstName", {
          onChange: () => console.log("changes"),
        })}
      />
    ),
    error: errors.firstName?.message,
  };
  // lastName props
  const lastNameProps = {
    label: "lastName",
    className: "form__field",
    input: (
      <TextInput
        register={register("lastName", {
          onChange: () => console.log("changes"),
        })}
      />
    ),
    error: errors.lastName?.message,
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
    error: errors.username?.message,
  };

  // submit button props
  const submitProps: IButtonProps = {
    text: "submit",
    type: "submit",
    icon: <span className="material-symbols-outlined">send</span>,
  };

  return {
    handleSubmit,
    usernameProps,
    firstNameProps,
    lastNameProps,
    passwordProps,
    submitProps,
  };
};
