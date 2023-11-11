"use client";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "./Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import useLoginMdoal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

const LoginModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const loginModal = useLoginMdoal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signInWithCredentials: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: true })
      .then((callback) => {
        if (callback?.error) {
          return toast({
            title: "Error",
            message: "Login Failed",
            type: "error",
          });
        }
        toast({
          title: "Logged in",
          message: "Logged in succesfully",
          type: "success",
        });
        loginModal.onClose();
        router.refresh();
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Welcome back"
      description="Sign in to use similarity API"
    >
      <form
        onSubmit={handleSubmit(signInWithCredentials)}
        className="flex flex-col gap-y-3"
      >
        <div className="">
          <label>Email</label>
          <Input {...register("email", { required: true })} type="email" />
        </div>
        <div className="">
          <label>Password</label>
          <Input
            {...register("password", { required: true })}
            type="password"
          />
        </div>
        <Button>Sign in</Button>
      </form>
      <hr />
      <Button
        onClick={() => {
          signIn("github");
        }}
        variant={"ghost"}
        className="border"
      >
        Sing in with github
      </Button>
      <div className="flex gap-x-2 items-center justify-center">
        <p>Don't have an account ?</p>
        <p
          onClick={() => {
            loginModal.onClose();
            registerModal.onOpen();
          }}
          className="underline underline-offset-2 cursor-pointer"
        >
          Sign up
        </p>
      </div>
    </Modal>
  );
};
export default LoginModal;
