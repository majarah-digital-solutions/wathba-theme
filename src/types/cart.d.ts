export interface CartType {
    _id: string;
    status: string;
    productDiscount: number;
    device: string;
    visitor: string;
    items: CartItem[];
    totalProducts: number;
    totalProductsAfterDiscount: number;
    couponDiscount: number;
    totalPrice: number;
    deleted: boolean;
    app: string;
    getCoupon: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
    properties: any[]; // Adjust type based on actual properties data structure
    price: number;
    priceAfterDiscount: number;
    totalPriceForItem: number;
    discount: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  }
  
  export interface Product {
    _id: string;
    title: string;
    slug: string;
    price: number;
    priceAfterDiscount: number;
    discount: number;
    properties: any[]; // Adjust type based on actual properties data structure
    app: string;
    images: ProductImage[];
    id: string;
  }
  
  export interface ProductImage {
    image: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    imageUrl: string;
    id: string;
  }