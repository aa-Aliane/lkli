import React from "react";
import { Form, FormField } from "../old.form";
import { Button } from "../basic/buttons";
import { useNewsLetterHooks } from "./newsletter.hooks";

const NewsLetter = () => {
  const { handleSubmit, formProps, emailProps, submitProps } =
    useNewsLetterHooks();
  return (
    <Form onSubmit={handleSubmit((data) => console.log(data))} {...formProps}>
      <FormField {...emailProps} />
      <Button {...submitProps} />
    </Form>
  );
};

export default NewsLetter;
