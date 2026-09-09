import ky from "ky";

export const apiClient = ky.create({
  prefixUrl: "https://dummyjson.com",
  headers: {
    "content-type": "application/json",
  },
});

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
};

export type ProductRating = {
  rate: number;
  count: number;
};

export type Category = {
  slug: string;
  name: string;
};

// Raw shape returned by dummyjson.com/products* endpoints (trimmed to the
// fields we actually use — the API returns a lot more per product).
type DummyProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviews?: unknown[];
  images?: string[];
  thumbnail?: string;
};

const toProduct = (product: DummyProduct): Product => ({
  id: product.id,
  title: product.title,
  price: product.price,
  description: product.description,
  category: product.category,
  image: product.thumbnail ?? product.images?.[0] ?? "",
  rating: {
    rate: product.rating,
    count: product.reviews?.length ?? 0,
  },
});

export const getProducts = async (): Promise<Product[]> => {
  const { products } = await apiClient
    .get("products", { searchParams: { limit: 0 } })
    .json<{ products: DummyProduct[] }>();

  return products.map(toProduct);
};

export const getProduct = async (id: number): Promise<Product> => {
  const product = await apiClient.get(`products/${id}`).json<DummyProduct>();

  return toProduct(product);
};

export const getCategories = async (): Promise<Category[]> => {
  return await apiClient.get("products/categories").json<Category[]>();
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const { products } = await apiClient
    .get(`products/category/${encodeURIComponent(category)}`)
    .json<{ products: DummyProduct[] }>();

  return products.map(toProduct);
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const { products } = await apiClient
    .get("products/search", { searchParams: { q: query } })
    .json<{ products: DummyProduct[] }>();

  return products.map(toProduct);
};

export type CheckoutContactInfo = {
  email: string;
  card_number: string;
  expiration_date: string;
  cvc: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
};

export const processCheckout = (contactInfo: CheckoutContactInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, contactInfo });
    }, 1000);
  });
};
