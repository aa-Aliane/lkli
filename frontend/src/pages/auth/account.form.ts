import { zodResolver } from "@hookform/resolvers/zod";
import { IAccountForm, schema } from "./account.schemas";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/basic/inputs";
import { useState } from "react";
import ImageInput from "../../components/basic/inputs/ImageInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUpdateAccountFetcher } from "./fetchers/accountFetcher";
import { useAuthStore } from "../../context/auth/auth.context";

export const useAccountProps = ({ accountInfo }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccountForm>({ resolver: zodResolver(schema) });

  const queryClient = useQueryClient();

  const { fetch } = useUpdateAccountFetcher();
  const { accountId } = useAuthStore();
  const { status, mutate } = useMutation({
    mutationKey: ["account"],
    mutationFn: (data: any) => fetch(accountId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });

  // Submit handler function
  const onSubmit = (data: IAccountForm) => {
    const newData = new FormData();
    newData.append("username", data.username);
    newData.append("first_name", data.firstName);
    newData.append("last_name", data.lastName);
    if (data.fileInput[0]) {
      newData.append("profile_picture", data.fileInput[0]);
    }
    mutate(newData);
  };

  // formProps
  const formProps = {
    onSubmit: handleSubmit(onSubmit),
  };

  // form inputs values
  const [usernameValue, setUsernameValue] = useState(
    accountInfo ? accountInfo.username : null
  );
  const [firstNameValue, setFirstNameValue] = useState(
    accountInfo ? accountInfo.first_name : null
  );
  const [lastNameValue, setLastNameValue] = useState(
    accountInfo ? accountInfo.last_name : null
  );

  // profile picture(image) props
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(
    accountInfo?.profile_picture
  );
  const [dataChanged, setDataChanged] = useState<boolean>(false);

  const handleFileChange = (event: any) => {
    const imageFile = event.target.files[0];
    setSelectedFile(imageFile);
    const imageTmp = URL.createObjectURL(imageFile);
    setProfilePicture(imageTmp);
    setDataChanged(true);
  };

  const imageProps = {
    label: "fileInput",
    className: "profile--picture",
    input: ImageInput({
      label: "fileInput",
      className: "userform__profile--picture",
      imageClassName: "profile--picture",
      profilePicture,
      dataChanged,
      register: register("fileInput", {
        onChange: handleFileChange,
      }),
    }),
  };

  // username props
  const usernameProps = {
    label: "username",
    className: "userform__item",
    input: TextInput({
      className: "text--action",
      id: "username",
      name: "username",
      placeholder: "Nom d'utilisateur",
      value: usernameValue,
      required: true,
      register: register("username", {
        onChange: (event: any) => setUsernameValue(event.target.value),
      }),
    }),
  };

  // firstName props
  const firstNameProps = {
    label: "firstName",
    className: "userform__item",
    input: TextInput({
      className: "text--action",
      id: "firstName",
      name: "firstName",
      placeholder: "Nom d'utilisateur",
      value: firstNameValue,
      required: true,
      register: register("firstName", {
        onChange: (event: any) => setFirstNameValue(event.target.value),
      }),
    }),
  };

  // username props
  const lastNameProps = {
    label: "lastName",
    className: "userform__item",
    input: TextInput({
      className: "text--action",
      id: "lastName",
      name: "lastName",
      placeholder: "Nom d'utilisateur",
      value: lastNameValue,
      required: true,
      register: register("lastName", {
        onChange: (event: any) => setLastNameValue(event.target.value),
      }),
    }),
  };

  return {
    formProps,
    imageProps,
    usernameProps,
    firstNameProps,
    lastNameProps,
    errors,
    status,
  };
};
