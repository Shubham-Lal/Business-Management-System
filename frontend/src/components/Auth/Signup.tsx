import { useState, type ChangeEvent, type MouseEvent } from "react";
import { toast } from "sonner";
import type { AuthProps } from "../../pages/Auth";
import useSendOtp from "../../hooks/auth/useSendOTP";
import useVerifyOtp from "../../hooks/auth/useVerifyOTP";
import useAuthFetch from "../../hooks/auth/useAuthFetch";
import useAuthStore from "../../store/authStore";
import PasswordInput from "../Input/Password";
import EmailInput from "../Input/Email";

const isEmailValid = (email: string): boolean => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

const isPasswordValid = (password: string): boolean => {
    return (
        password.length >= 6 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[#@$%&]/.test(password) &&
        /^\S*$/.test(password)
    );
};

const Signup = ({ setTab }: AuthProps) => {
    const { isOTPSending, isOTPSent, sendOtp } = useSendOtp();
    const { isOTPVerifying, verifyOtp } = useVerifyOtp();
    const { fetchUser } = useAuthFetch();

    const { isAuthenticating } = useAuthStore();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        otp: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSendOTP = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { name, email, password } = formData;

        if (!name) {
            return toast.error("Name is required");
        }
        if (!isEmailValid(email)) {
            return toast.error("Please enter a valid email address");
        }
        if (!isPasswordValid(password)) {
            return toast.error(
                "Password must be at least 6 characters, include lowercase, uppercase, number, special character (#@$%&), and no spaces"
            );
        }

        await sendOtp(email);
    };

    const handleVerifyOTP = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { name, email, password, otp } = formData;

        if (!name) {
            return toast.error("Name is required");
        }
        if (!isEmailValid(email)) {
            return toast.error("Please enter a valid email address");
        }
        if (!isPasswordValid(password)) {
            return toast.error(
                "Password must be at least 6 characters, include lowercase, uppercase, number, special character (#@$%&), and no spaces"
            );
        }
        if (otp.trim().length !== 6) {
            return toast.error("Enter 6 digit OTP sent to your mail");
        }

        const ok = await verifyOtp(name, email, password, otp);
        if (ok) await fetchUser();
    };

    return (
        <div className="min-h-[100svh] grid place-items-center">
            <div className="sm:max-w-lg w-full h-fit mx-auto p-2">
                <div className="p-6 bg-white rounded-xl shadow-md">
                    <div className="mt-3 mb-6 flex flex-col items-center justify-center text-lg font-semibold">
                        <img src="logo.png" alt="" className="size-10" />
                        Register your account
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-800">
                                Name
                            </label>
                            <div className="flex items-center focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 border border-gray-300 rounded-md">
                                <input
                                    disabled={isOTPSending || isOTPSent}
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-sm rounded-md outline-0 disabled:text-gray-500"
                                />
                            </div>
                        </div>

                        <EmailInput
                            disabled={isOTPSending || isOTPSent}
                            value={formData.email}
                            onChange={handleChange}
                            useValidation
                        />

                        <PasswordInput
                            disabled={isOTPSending || isOTPSent}
                            value={formData.password}
                            onChange={handleChange}
                            useValidation
                        />

                        {isOTPSent && (
                            <div>
                                <label className="block mb-1 font-medium text-gray-800">
                                    OTP
                                </label>
                                <div className="flex items-center focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 border border-gray-300 rounded-md">
                                    <input
                                        disabled={isOTPVerifying || isAuthenticating}
                                        type="number"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm rounded-md outline-0 disabled:text-gray-500"
                                    />
                                </div>
                            </div>
                        )}

                        {!isOTPSent ? (
                            <button
                                disabled={isOTPSending}
                                onClick={handleSendOTP}
                                className={`
                                relative w-full py-2 px-4 flex items-center justify-center gap-2 font-semibold text-white rounded-md transition duration-200 
                                ${isOTPSending
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    }
                            `}
                            >
                                {isOTPSending && (
                                    <div className="absolute right-2 size-4 border-2 border-white border-t-gray-800 rounded-full animate-spin" />
                                )}
                                Signup
                            </button>
                        ) : (
                            <button
                                disabled={isOTPVerifying || isAuthenticating}
                                onClick={handleVerifyOTP}
                                className={`
                                relative w-full py-2 px-4 flex items-center justify-center gap-2 font-semibold text-white rounded-md transition duration-200 
                                ${(isOTPVerifying || isAuthenticating)
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    }
                            `}
                            >
                                {(isOTPVerifying || isAuthenticating) && (
                                    <div className="absolute right-2 size-4 border-2 border-white border-t-gray-800 rounded-full animate-spin" />
                                )}
                                Create Account
                            </button>
                        )}

                        <div className="flex flex-col items-center text-sm font-[500]">
                            <p>
                                Already have an account?{" "}
                                <button
                                    onClick={() => setTab("login")}
                                    className="text-blue-600 cursor-pointer"
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup