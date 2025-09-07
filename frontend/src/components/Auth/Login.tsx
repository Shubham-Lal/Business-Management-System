import { useState, type ChangeEvent, type FormEvent } from "react";
import type { AuthProps } from "../../pages/Auth";
import useLoginUser from "../../hooks/auth/useLoginUser";
import useAuthFetch from "../../hooks/auth/useAuthFetch";
import useAuthStore from "../../store/authStore";
import PasswordInput from "../Input/Password";
import EmailInput from "../Input/Email";

const Login = ({ setTab }: AuthProps) => {
    const { isLoading, loginUser } = useLoginUser();
    const { fetchUser } = useAuthFetch();

    const { isAuthenticating } = useAuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password } = formData;

        const ok = await loginUser(email, password);
        if (ok) await fetchUser();
    };

    return (
        <div className="min-h-[100svh] grid place-items-center">
            <div className="sm:max-w-lg w-full h-fit mx-auto p-2">
                <div className="p-6 bg-white rounded-xl shadow-md">
                    <div className="mt-3 mb-6 flex flex-col items-center justify-center text-lg font-semibold">
                        <img src="logo.png" alt="" className="size-10" />
                        Login to your account
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <EmailInput
                            disabled={isLoading || isAuthenticating}
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <PasswordInput
                            disabled={isLoading || isAuthenticating}
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            disabled={isLoading || isAuthenticating}
                            className={`
                                relative w-full py-2 px-4 flex items-center justify-center gap-2 font-semibold text-white rounded-md transition duration-200 
                                ${(isLoading || isAuthenticating)
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                }
                            `}
                        >
                            {(isLoading || isAuthenticating) && (
                                <div className="absolute right-2 size-4 border-2 border-white border-t-gray-800 rounded-full animate-spin" />
                            )}
                            Login
                        </button>

                        <div className="flex flex-col items-center text-sm font-[500]">
                            <p>
                                Don&apos;t have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setTab("signup")}
                                    className="text-blue-600 cursor-pointer"
                                >
                                    Signup
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login