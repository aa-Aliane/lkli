import { Form, FormField } from "../../components/old.form";
import { Button } from "../../components/basic/buttons";
import { useFormProps } from "./signup.hooks";

const Signup = () => {
  const {
    handleSubmit,
    usernameProps,
    firstNameProps,
    lastNameProps,
    passwordProps,
    submitProps,
  } = useFormProps();

  return (
    <Form onSubmit={handleSubmit((data: any) => console.log(data))}>
      <FormField {...usernameProps} />
      <FormField {...firstNameProps} />
      <FormField {...lastNameProps} />
      <FormField {...passwordProps} />
      <Button {...submitProps} />
    </Form>
  );
};

export default Signup;
