import {
  Product,
  getProducts,
  getProductsByCategory,
  formatCategoryLabel,
} from "shared";
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

const ProductsListing = ({
  products,
  title,
}: {
  products: Product[];
  title?: string;
}) => {
  return <ProductsListingPage products={products} title={title} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { category } = ctx.query;

  const products =
    typeof category === "string"
      ? await getProductsByCategory(category)
      : await getProducts();

  return {
    props: {
      products,
      ...(typeof category === "string" && {
        title: formatCategoryLabel(category),
      }),
    },
  };
};

export default ProductsListing;
