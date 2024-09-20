import { form } from "../../components/basic/form";
import { useFormProps } from "./signin.hooks";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useSocialSigninMutation } from "../../api/queries/authQueries";
import { Button } from "../../components/basic/buttons";

const Signin = () => {
  const { formProps } = useFormProps();

  const { data, mutate, status } = useSocialSigninMutation();

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const token = credentialResponse.access_token;
      console.log("access_token", token);
      if (token) mutate({ token: token, backend: "google-oauth2" });
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <form.Form {...formProps}>
      <form.Header></form.Header>
      <form.Body>{data === null ? <>{status}</> : <>data</>}</form.Body>
      <Button onClick={() => login()}>login</Button>
    </form.Form>
  );
};

export default Signin;
