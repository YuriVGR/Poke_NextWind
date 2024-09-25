"use client";

import { useState, useEffect, useRef } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="flex size-8/12 flex-col rounded-lg bg-white"
      >
        <div className="flex h-full w-full flex-col items-center justify-between rounded-lg p-4">
          <div className="flex w-full flex-row justify-around gap-4">
            <img
              src={characterPic}
              alt={name}
              className="size-64 rounded-lg bg-blue-300"
            />
            <div className="flex w-full flex-col rounded-lg border-4 border-black">
              <div className="flex flex-row gap-2 bg-black px-2 text-white">
                <h1 className="text-2xl font-bold">{name}</h1>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <p className="text-m">
                  <strong>Type:</strong> {type}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="transition-color w-fit rounded-lg bg-red-300 p-1 px-2 font-bold text-white hover:bg-red-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
