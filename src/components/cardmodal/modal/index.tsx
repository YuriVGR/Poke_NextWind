"use client";

import { useState, useEffect } from "react";

interface ModalProps {
  name: string;
  type: string;
  characterPic: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  name,
  type,
  characterPic,
  isOpen,
  onClose,
}: ModalProps) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  if (!open) return null;

  return (
    <div className="absolute z-50 flex size-96 flex-col rounded-lg bg-white">
      <div className="flex h-full w-full flex-col items-center justify-between rounded-lg p-4">
        <div className="flex w-full flex-row justify-around">
          <img
            src={characterPic}
            alt={name}
            className="size-44 rounded-lg bg-blue-300"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-sm">{type}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-fit bg-red-300 p-1 px-2 rounded-lg font-bold text-white hover:bg-red-200 transition-color"
        >
          Close
        </button>
      </div>
    </div>
  );
}
