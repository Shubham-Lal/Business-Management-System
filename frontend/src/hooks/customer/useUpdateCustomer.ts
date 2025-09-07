import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import useCustomerStore, { type Customer } from "../../store/customerStore";

export default function useUpdateCustomer() {
    const { customers, setCustomers } = useCustomerStore();

    const [isUpdating, setUpdating] = useState(false);

    const updateCustomer = async (
        _id: string,
        name: string,
        phone: string,
        email: string,
        address?: string
    ): Promise<boolean> => {
        try {
            setUpdating(true);

            const res = await axios.put<{ message: string; customer: Customer }>(
                `${import.meta.env.VITE_SERVER_URL}/api/customer`,
                { _id, name, phone, email, address },
                { withCredentials: true }
            );

            setCustomers(customers.map((c) => (c._id === _id ? res.data.customer : c)));
            toast.success(res.data.message || "Customer updated");
            return true;
        }
        catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || "Failed to update customer");
            return false;
        }
        finally {
            setUpdating(false);
        }
    };

    return { isUpdating, updateCustomer };
}