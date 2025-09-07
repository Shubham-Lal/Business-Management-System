import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import useCustomerStore, { type Customer } from "../../store/customerStore";

export default function useAddCustomer() {
    const { customers, setCustomers } = useCustomerStore();

    const [isAdding, setAdding] = useState(false);

    const addCustomer = async (
        name: string,
        phone: string,
        email: string,
        address: string
    ): Promise<boolean> => {
        try {
            setAdding(true);

            const res = await axios.post<{ message: string; customer: Customer }>(
                `${import.meta.env.VITE_SERVER_URL}/api/customer`,
                { name, phone, email, address },
                { withCredentials: true }
            );

            setCustomers([res.data.customer, ...customers]);
            toast.success(res.data.message || "Customer added");
            return true;
        }
        catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || "Failed to add customer");
            return false;
        }
        finally {
            setAdding(false);
        }
    };

    return { isAdding, addCustomer };
}