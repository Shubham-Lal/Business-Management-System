import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import useProductStore, { type Product } from "../../store/productStore";

export default function useGetProducts() {
    const { setProducts } = useProductStore();

    const [isLoading, setLoading] = useState(false);

    const getProducts = useCallback(async () => {
        try {
            setLoading(true);

            const res = await axios.get<{ products: Product[] }>(
                `${import.meta.env.VITE_SERVER_URL}/api/product`,
                { withCredentials: true }
            );

            setProducts(res.data.products);
        }
        catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || "Failed to fetch products");
        }
        finally {
            setLoading(false);
        }
    }, [setProducts]);

    return { isLoading, getProducts };
}