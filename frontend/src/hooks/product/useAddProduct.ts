import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import useProductStore, { type Product } from "../../store/productStore";

export default function useAddProduct() {
    const { products, setProducts } = useProductStore();

    const [isAdding, setAdding] = useState(false);

    const addProduct = async (
        name: string,
        price: number,
        stock: number,
        category: string,
        description?: string
    ): Promise<boolean> => {
        try {
            setAdding(true);

            const res = await axios.post<{ message: string; product: Product }>(
                `${import.meta.env.VITE_SERVER_URL}/api/product`,
                { name, description, price, stock, category },
                { withCredentials: true }
            );

            setProducts([res.data.product, ...products]);
            toast.success(res.data.message || "Product added");
            return true;
        }
        catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || "Failed to add product");
            return false;
        }
        finally {
            setAdding(false);
        }
    };

    return { isAdding, addProduct };
}