import { useState, useEffect } from "react";
import { faFilter } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Filter() {
  return (
    <div className="flex flex-col gap-2">
      <FontAwesomeIcon icon={faFilter} />
      <h1 className="text-lg font-bold">Filter</h1>
    </div>
  );
}
