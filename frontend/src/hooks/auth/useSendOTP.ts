import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function useSendOtp() {
    const [isOTPSending, setOTPSending] = useState(false);
    const [isOTPSent, setOTPSent] = useState(false);

    const sendOtp = async (email: string) => {
        try {
            setOTPSending(true);

            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/otp/send`,
                { email }
            );

            setOTPSent(true);
            toast.info("OTP sent to your email");
        }
        catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            toast.error(error.response?.data?.message || "Failed to send OTP");
        }
        finally {
            setOTPSending(false);
        }
    };

    return { isOTPSending, isOTPSent, sendOtp };
}