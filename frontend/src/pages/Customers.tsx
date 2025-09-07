import { useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import AddCustomer from "../modals/AddCustomer";

export default function Customers() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = (state?: boolean) => {
        const newState = state ?? !isOpen;
        setIsOpen(newState);
        document.body.style.overflow = newState ? "hidden" : "";
    };

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


            </div>

            {isOpen && <AddCustomer toggleModal={toggleModal} />}
        </>
    )
}