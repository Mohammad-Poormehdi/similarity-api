"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  children,
  onClose,
}) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed backdrop-blur-sm bg-slate-900/50" />
        <Dialog.Content className="text-black flex flex-col gap-y-4 bg-white fixed top-1/2 left-1/2 w-1/4 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg drop-shadow-lg dark:text-white dark:bg-slate-900 dark:border">
          <div>
            <Dialog.Title className="text-center font-semibold text-xl">
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-center">
              {description}
            </Dialog.Description>
          </div>
          <hr />
          {children}
          <Dialog.Close>
            <button onClick={onClose}>
              <XCircle size={24} className="absolute right-5 top-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default Modal;
