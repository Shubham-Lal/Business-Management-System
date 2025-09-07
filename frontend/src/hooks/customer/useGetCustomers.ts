import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import useCustomerStore, { type Customer } from "../../store/customerStore";

export default function useGetCustomers() {
    const { setCustomers } = useCustomerStore();

    const [isLoading, setLoading] = useState(false);

    const getCustomers = useCallback(async () => {
        try {
            setLoading(true);

            const res = await axios.get<{ customers: Customer[] }>(
                `${import.meta.env.VITE_SERVER_URL}/api/customer`,
                { withCredentials: true }
            );

            setCustomers(res.data.customers);
        }
        catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || "Failed to fetch customers");
        }
        finally {
            setLoading(false);
        }
    }, [setCustomers]);

    return { isLoading, getCustomers };
}