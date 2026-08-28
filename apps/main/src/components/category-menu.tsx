import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { getCategories, formatCategoryLabel } from "shared";
import clsx from "clsx";

export const CategoryMenu = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  if (categories.length === 0) {
    return null;
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-1">
        Categories
        <ChevronDownIcon className="w-4 h-4" />
      </Menu.Button>
      <Menu.Items className="absolute left-0 z-10 mt-2 bg-white border rounded shadow-lg w-52 focus:outline-none">
        {categories.map((category) => (
          <Menu.Item key={category}>
            {({ active }) => (
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                className={clsx("block px-4 py-2 capitalize", {
                  "bg-gray-100": active,
                })}
              >
                {formatCategoryLabel(category)}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
