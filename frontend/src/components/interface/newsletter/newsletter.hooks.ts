import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput } from "../../basic/inputs";
import { IButtonProps } from "../../basic/buttons/Button";

const schema = z.object({
  email: z.string().email(),
});

interface INewsLetterForm {
  email: string;
}

export const useNewsLetterHooks = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewsLetterForm>({
    resolver: zodResolver(schema),
  });

  const formProps: IFormProps = {
    title: "signup for newsletter",
    className: "form border-neutral-200",
    titleClassName: "clr-primary-500",
  };

  const emailProps: IFormFieldProps = {
    label: "email",
    input: TextInput({
      register: register("email", { onChange: () => console.log("email") }),
    }),
    error: errors.email?.message,
    className: "form__field",
  };

  const submitProps: IButtonProps = {
    text: "submit",
  };

  return { handleSubmit, formProps, emailProps, submitProps };
};
