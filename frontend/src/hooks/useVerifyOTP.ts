import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function useVerifyOtp() {
    const [isOTPVerifying, setOTPVerifying] = useState(false);

    const verifyOtp = async (
        name: string, 
        email: string, 
        password: string,
        otp: string
    ): Promise<boolean> => {
        try {
            setOTPVerifying(true);

            const res = await axios.post<{ message: string }>(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/otp/verify`,
                { name, email, password, otp },
                { withCredentials: true }
            );

            toast.success(res.data.message || "Signup successful");
            return true;
        }
        catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || "Failed to verify OTP");
            return false;
        }
        finally {
            setOTPVerifying(false);
        }
    };

    return { isOTPVerifying, verifyOtp };
}