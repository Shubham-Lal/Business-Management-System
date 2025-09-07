import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";

interface AddCustomerProps {
    toggleModal: (state?: boolean) => void;
}

const isEmailValid = (email: string): boolean => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

const isIndianPhoneValid = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

const normalizePhone = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("91") && cleaned.length > 10) {
        cleaned = cleaned.slice(cleaned.length - 10);
    }

    return cleaned;
};

const AddCustomer: React.FC<AddCustomerProps> = ({ toggleModal }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddCustomer = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name, email, address } = formData;
        const phone = normalizePhone(formData.phone);

        if (!name) {
            return toast.error("Name is required");
        }
        if (!phone) {
            return toast.error("Phone is required");
        }
        if (!isIndianPhoneValid(phone)) {
            return toast.error("Please enter a valid Indian phone number");
        }
        if (!email) {
            return toast.error("Email is required");
        }
        if (!isEmailValid(email)) {
            return toast.error("Please enter a valid email address");
        }
        if (!address) {
            return toast.error("Address is required");
        }


    };

    return (
        <div
            className="fixed inset-0 bg-black/50 grid place-items-center z-50"
            onClick={() => toggleModal(false)}
        >
            <form
                onSubmit={handleAddCustomer}
                className="relative bg-white rounded-xl shadow-lg w-[calc(100%-16px)] sm:max-w-lg max-h-[100svh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="px-6 pt-6 text-lg font-semibold text-gray-800 mb-4">
                    Customer Details
                </h2>

                <div className="mb-4 px-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md disabled:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md disabled:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md disabled:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md disabled:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="py-4 px-6 grid grid-cols-2 gap-3 bg-gray-50">
                    <button
                        type="button"
                        onClick={() => toggleModal(false)}
                        className="relative w-full py-2 px-4 flex items-center justify-center gap-2 font-semibold bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200 cursor-pointer"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="relative w-full py-2 px-4 flex items-center justify-center gap-2 font-semibold text-white rounded-md transition duration-200 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCustomer