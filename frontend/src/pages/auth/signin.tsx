import { Form, FormField } from "../../components/old.form";
import { Button } from "../../components/basic/buttons";
import { useFormProps } from "./signin.hooks";

const Signin = () => {
  const { handleSubmit, usernameProps, passwordProps, submitProps } =
    useFormProps();

  return (
    <Form onSubmit={handleSubmit((data) => console.log(data))}>
      <FormField {...usernameProps} />
      <FormField {...passwordProps} />
      <Button {...submitProps} />
    </Form>
  );
};

export default Signin;
