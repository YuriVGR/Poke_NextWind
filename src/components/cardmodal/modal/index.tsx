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
    <div className="absolute inset-0 size-fit bg-black">
      <div className="space between flex flex-row">
        <img src={characterPic} alt={name} />
        <div className="flex flex-col">
          <h1>{name}</h1>
          <p>{type}</p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
