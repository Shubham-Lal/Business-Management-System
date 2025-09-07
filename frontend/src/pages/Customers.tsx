import { useState, useEffect } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import useGetCustomers from "../hooks/customer/useGetCustomers";
import useCustomerStore from "../store/customerStore";
import AddCustomer from "../modals/AddCustomer";

export default function Customers() {
    const { isLoading, getCustomers } = useGetCustomers();

    const { customers } = useCustomerStore();

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = (state?: boolean) => {
        const newState = state ?? !isOpen;
        setIsOpen(newState);
        document.body.style.overflow = newState ? "hidden" : "";
    };

    useEffect(() => {
        if (!customers.length) {
            getCustomers();
        }
    }, [customers.length, getCustomers]);

    return (
        <>
            <div className="flex items-center justify-between bg-gradient-to-r from-[#000046] to-[#1cb5e0] text-white p-4 sm:p-6 shadow-md">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold line-clamp-1">
                        Customers 👥
                    </h1>
                    <p className="text-sm md:text-base font-[500] opacity-90">
                        All your Customers will be listed here
                    </p>
                </div>
            </div>

            <div className="p-4 sm:p-6">
                <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm">
                    <button
                        onClick={() => toggleModal(true)}
                        className="flex flex-col items-center justify-center aspect-square border border-gray-200 hover:shadow-md transition rounded-xl overflow-hidden cursor-pointer"
                    >
                        <div className="size-full flex items-center justify-center flex-grow bg-white">
                            <RiAddCircleFill size={20} className="text-[#1cb5e0]" />
                        </div>
                        <p className="w-full px-2 pt-1 pb-1.5 text-sm sm:text-sm text-center font-medium bg-gray-50 text-gray-700 leading-[16px]">
                            Add<br />Customer
                        </p>
                    </button>
                </div>

                {(isLoading && customers.length === 0) ? (
                    <div className="mx-auto size-4 border-2 border-white border-t-gray-800 rounded-full animate-spin" />
                ) : (
                    <div className="mt-4 sm:mt-6 rounded-xl overflow-hidden border border-gray-300 shadow-md overflow-x-auto overscroll-x-none">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="text-start font-semibold p-2">Name</th>
                                    <th className="text-start font-semibold p-2">Phone</th>
                                    <th className="text-start font-semibold p-2">Email</th>
                                    <th className="min-w-[300px] text-start font-semibold p-2">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer, index) => (
                                    <tr
                                        key={index}
                                        className={`text-center text-gray-700 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                                    >
                                        <td className="py-1 px-2 text-start whitespace-nowrap">{customer.name}</td>
                                        <td className="py-1 px-2 text-start">{customer.phone}</td>
                                        <td className="py-1 px-2 text-start">{customer.email}</td>
                                        <td className="py-1 px-2 text-start line-clamp-1">{customer.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isOpen && <AddCustomer toggleModal={toggleModal} />}
        </>
    )
}