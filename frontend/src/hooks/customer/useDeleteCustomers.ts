import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import useCustomerStore from "../../store/customerStore";

export default function useDeleteCustomers() {
    const { customers, setCustomers } = useCustomerStore();

    const [isDeleting, setDeleting] = useState(false);

    const deleteCustomers = async (ids: string[]): Promise<boolean> => {
        try {
            setDeleting(true);

            const res = await axios.delete<{ message: string }>(
                `${import.meta.env.VITE_SERVER_URL}/api/customer`,
                {
                    data: { ids },
                    withCredentials: true
                }
            );

            setCustomers(customers.filter((c) => !ids.includes(c._id)));
            toast.success(res.data.message || "Customer(s) deleted");
            return true;
        }
        catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || "Failed to delete customer(s)");
            return false;
        }
        finally {
            setDeleting(false);
        }
    };

    return { isDeleting, deleteCustomers };
}