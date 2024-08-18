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
  uid?: string;
}

export interface Client {
  name: string;
  email: string;
  phone: string;
  uid: string;
}

// type SaleItem = { productId: string; quantity: number; price: number };
// export interface Sales {
//   saleId?: string;
//   date: string;
//   totalAmout: number;
//   Items: SaleItem;
//   product?: string;
//   name?: string;
//   email?: string;
//   uid: string
// }

export interface Sales {
  saleId?: string;
  date: string;
  email: string;
  name: string;
  product: string;
  totalAmout: number;
  Items: {
    price: number;
    productId: string;
    quantity: number;
  };
  uid: string;
}


export interface SalesByClient {
  [clientId: string]: Sales;
}

export interface ClientSales {
  clientId: string;
  sales: Sales[];
}
