import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function useLoginUser() {
    const [isLoading, setLoading] = useState(false);

    const loginUser = async (
        email: string,
        password: string
    ): Promise<boolean> => {
        try {
            setLoading(true);

            await axios.post<{ message: string }>(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
                { email, password },
                { withCredentials: true }
            );

            return true;
        }
        catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || "Failed to verify OTP");
            return false;
        }
        finally {
            setLoading(false);
        }
    };

    return { isLoading, loginUser };
}