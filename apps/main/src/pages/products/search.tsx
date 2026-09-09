import { Product, searchProducts } from "shared";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

const ProductsListingPage = dynamic(
  () =>
    import("products/products-listing-page").then(
      (mod) => mod.ProductsListingPage
    ),
  {
    ssr: false,
  }
);

const SearchResults = ({
  products,
  query,
}: {
  products: Product[];
  query: string;
}) => {
  const title = query ? `Search results for "${query}"` : "Search";

  return <ProductsListingPage products={products} title={title} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { q } = ctx.query;
  const query = typeof q === "string" ? q : "";

  const products = query ? await searchProducts(query) : [];

  return {
    props: {
      products,
      query,
    },
  };
};

export default SearchResults;
