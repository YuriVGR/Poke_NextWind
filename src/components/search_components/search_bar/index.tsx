"use client";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <input
      type="search"
      placeholder="Search for a pokemon"
      className="w-96 h-10 rounded-xl border border-slate-300 bg-white p-1 px-2 focus:outline-none focus:border-slate-500"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
