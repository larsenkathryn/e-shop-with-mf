import ky from "ky";

export const apiClient = ky.create({
  prefixUrl: "https://fakestoreapi.com",
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

export const getProducts = async (): Promise<Product[]> => {
  return await apiClient.get("products").json();
};

export const getProduct = async (id: number): Promise<Product> => {
  return await apiClient.get(`products/${id}`).json();
};

export const getCategories = async (): Promise<string[]> => {
  return await apiClient.get("products/categories").json();
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  return await apiClient
    .get(`products/category/${encodeURIComponent(category)}`)
    .json();
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
