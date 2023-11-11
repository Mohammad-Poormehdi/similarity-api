import useRegisterModal from "@/hooks/useRegisterModal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "./Modal";
import useLoginMdoal from "@/hooks/useLoginModal";
import { useForm } from "react-hook-form";
import { toast } from "../ui/toast";
import { useState } from "react";
import axios from "axios";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginMdoal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    setIsLoading(true);
    if (data.password1 !== data.password2) {
      setIsLoading(false);
      return toast({
        title: "Password Error",
        type: "error",
        message: "Passwords does not match ",
      });
    }
    axios
      .post("/api/register/", { email: data.email, password: data.password1 })
      .then(() => {
        toast({
          title: "Account Created",
          message: "Account created succesfully",
          type: "success",
        });
        registerModal.onClose();
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          message: "Internal Server Error",
          type: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal
      title="Welcome to Similarity API"
      description="Create your account to use similarity API"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <label>Email</label>
          <Input {...register("email", { required: true })} type="email" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>Password</label>
          <Input
            {...register("password1", { required: true })}
            type="password"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>Confirm Password</label>
          <Input
            {...register("password2", { required: true })}
            type="password"
          />
        </div>
        <Button>Sign up</Button>
      </form>
      <div className="flex items-center justify-center gap-x-2">
        <p>Already have an account ?</p>
        <p
          onClick={() => {
            registerModal.onClose();
            loginModal.onOpen();
          }}
          className="cursor-pointer underline underline-offset-2"
        >
          Sign in
        </p>
      </div>
    </Modal>
  );
};
export default RegisterModal;
