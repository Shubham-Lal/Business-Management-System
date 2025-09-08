import { create } from "zustand";

export interface Product {
    _id: string
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
}

interface ProductState {
    products: Product[]
    setProducts: (productsData: Product[] | []) => void
}

const useProductStore = create<ProductState>((set) => ({
    products: [],
    setProducts: (productsData) => set({ products: productsData })
}));

export default useProductStore;