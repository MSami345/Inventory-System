export type Item = {
  title: string;
  href: string;
};

type Category = "mobile" | "laptop" | "tablet";
export interface Product {
  productName: string;
  quantity: number;
  category: Category;
  companyName: string;
  price: number;
  uid: string;
}
