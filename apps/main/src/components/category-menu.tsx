import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { getCategories, Category } from "shared";
import clsx from "clsx";

export const CategoryMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);

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
      <Menu.Items className="absolute left-0 z-10 mt-2 overflow-y-auto bg-white border rounded shadow-lg w-52 max-h-96 focus:outline-none">
        {categories.map((category) => (
          <Menu.Item key={category.slug}>
            {({ active }) => (
              <Link
                href={`/products?category=${encodeURIComponent(
                  category.slug
                )}`}
                className={clsx("block px-4 py-2", {
                  "bg-gray-100": active,
                })}
              >
                {category.name}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
