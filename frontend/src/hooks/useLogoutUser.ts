import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import useAuthStore from "../store/authStore";

export default function useLogoutUser() {
    const { clearUser } = useAuthStore();

    const [isLoading, setLoading] = useState(false);

    const logoutUser = async () => {
        try {
            setLoading(true);

            await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
                { withCredentials: true }
            );

            clearUser();
            toast.info("Logged out");
        }
        catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || "Failed to logout");
        }
        finally {
            setLoading(false);
        }
    };

    return { isLoading, logoutUser };
}