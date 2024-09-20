import { useQuery } from "@tanstack/react-query";
import { form } from "../../components/basic/form";
import { Button } from "../../components/basic/buttons";
import { useAccountProps } from "./account.form";
import { useSignoutMutation } from "../../api/queries/authQueries";
import { useNavigate } from "@tanstack/react-router";

const Account = () => {
  const { data: accountInfo } = useQuery({ queryKey: ["account"] });
  const { mutate: logout } = useSignoutMutation();

  const navigate = useNavigate();

  const {
    formProps,
    imageProps,
    usernameProps,
    firstNameProps,
    lastNameProps,
    errors,
    status,
  } = useAccountProps({ accountInfo });

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <>
      <form.Form className="userform centered" {...formProps}>
        <form.Header className="userform__header">
          <legend className="userform__title">{accountInfo?.username}</legend>
          {imageProps.input}
          {errors?.fileInput && (
            <p className="message--error img--error">
              {errors.fileInput.message}
            </p>
          )}
        </form.Header>
        <form.Body className="userform__body">
          {/* username Item */}
          <div className={usernameProps.className}>
            <label htmlFor={usernameProps.label}>utilisateur</label>
            {usernameProps.input}
            {errors?.username && (
              <p className="message--error">{errors.username.message}</p>
            )}
          </div>
          {/* firstName Item */}
          <div className={firstNameProps.className}>
            <label htmlFor={firstNameProps.label}>prénom</label>
            {firstNameProps.input}
          </div>
          {/* lastName Item */}
          <div className={lastNameProps.className}>
            <label htmlFor={lastNameProps.label}>nom de famille</label>
            {lastNameProps.input}
          </div>
        </form.Body>
        <form.Footer className="userform__footer">
          <Button className="btn btn--variant-1" type="submit">
            mettre à jour
          </Button>
          <Button className="btn btn--variant-3" onClick={handleLogout}>
            Se déconnecter
          </Button>
          {status === "success" && (
            <p className="message--success">votre compte est à jour</p>
          )}
        </form.Footer>
      </form.Form>
    </>
  );
};

export default Account;
