import { useState } from "react";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState(() =>
    typeof router.query.q === "string" ? router.query.q : ""
  );

  const search = () => {
    const trimmed = query.trim();

    if (trimmed.length === 0) {
      if (router.pathname === "/products/search") {
        router.push("/products");
      }
      return;
    }

    router.push({ pathname: "/products/search", query: { q: trimmed } });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={search}
        aria-label="Search"
        className="absolute -translate-y-1/2 left-2 top-1/2"
      >
        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
      </button>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            search();
          }
        }}
        placeholder="Search products..."
        className="w-40 py-1 pl-8 pr-2 text-sm border rounded sm:w-64"
      />
    </div>
  );
};
