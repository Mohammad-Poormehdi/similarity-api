"use client";

import { useState } from "react";
import Button from "./ui/Button";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/toast";
import useLoginMdoal from "@/hooks/useLoginModal";

interface SignInButtonProps {}

const SignInButton: React.FC<SignInButtonProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginModal = useLoginMdoal();

  const signInWithCredentials = async () => {
    loginModal.onOpen();
  };

  return (
    <Button onClick={signInWithCredentials} isLoading={isLoading}>
      Sign in
    </Button>
  );
};
export default SignInButton;
