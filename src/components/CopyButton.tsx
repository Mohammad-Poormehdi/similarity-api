"use client";

import { Copy } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import Button from "./ui/Button";
import { toast } from "./ui/toast";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  className,
  valueToCopy,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      className={className}
      {...props}
      typeof="button"
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);
        toast({
          title: "Copy",
          message: "API Key copied to clipboard",
          type: "success",
        });
      }}
    >
      <Copy className="h-5 w-5" />
    </Button>
  );
};
export default CopyButton;
