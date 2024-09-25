"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type CardProps = {
  name: string;
  type: string;
  bgUrl: string;
  onOpenModal: () => void;
};

export default function CardModal({
  name,
  type,
  bgUrl,
  onOpenModal,
}: CardProps) {
  return (
    <>
      <button
        className={`group relative flex size-32 flex-col-reverse overflow-hidden rounded-lg bg-blue-300 bg-cover bg-center transition-all hover:shadow-xl hover:shadow-blue-300/40`}
        onClick={onOpenModal}
      >
        <div className="z-10 flex h-0 w-full flex-col items-center justify-center overflow-clip bg-black/40 text-white transition-all hover:py-3 group-hover:h-fit">
          <h1 className="text-lg font-bold">{name}</h1>
          <p className="text-sm">{type}</p>
        </div>
        <div className="absolute flex size-full items-center justify-center">
          <img
            src={bgUrl}
            alt={name}
            className="size-full object-cover transition-all duration-300 group-hover:scale-90"
          />
        </div>
      </button>
    </>
  );
}
