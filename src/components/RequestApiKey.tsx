"use client";

import { FormEvent, useState } from "react";
import { toast } from "./ui/toast";
import { Key } from "lucide-react";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import CopyButton from "./CopyButton";
import Input from "./ui/Input";
import Button from "./ui/Button";
import axios from "axios";

const RequestApiKey = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>();

  const createNewAPiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreating(true);
    try {
      const generatedApiKey = await axios
        .post("/api/api-key/create")
        .then(() => {
          setApiKey("hi");
          toast({
            title: "API Key created",
            message: "API key generated sucessfully",
            type: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Error",
            message: "Failed to create api key",
            type: "error",
          });
        })
        .finally(() => setIsCreating(false));
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          message: error.message,
          type: "error",
        });
      } else {
        toast({
          title: "Error",
          message: "Something went wrong",
          type: "error",
        });
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container mt-40 md:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto w-12 h-12 text-gray-400" />
        <LargeHeading>Request your API Key</LargeHeading>
        <Paragraph>you have&apos;t requested an API Key yet</Paragraph>
      </div>
      <form
        onSubmit={createNewAPiKey}
        className="mt-6 sm:flex sm:items-center"
        action="#"
      >
        <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <>
              <CopyButton
                valueToCopy={apiKey}
                className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
              />
            </>
          ) : (
            <Input
              readOnly
              value={apiKey ?? ""}
              placeholder="Request an API Key to display it here"
            />
          )}
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0 ">
          <Button isLoading={isCreating}>Request Key</Button>
        </div>
      </form>
    </div>
  );
};
export default RequestApiKey;
