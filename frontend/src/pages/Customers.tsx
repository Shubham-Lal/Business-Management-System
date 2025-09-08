import { useState, useEffect } from "react";
import { RiAddBoxLine, RiEditBoxLine, RiPhoneLine, RiDeleteBin6Line } from "react-icons/ri";
import useGetCustomers from "../hooks/customer/useGetCustomers";
import useCustomerStore from "../store/customerStore";
import CustomerForm from "../components/Modal/CustomerForm";
import DeleteCustomer from "../components/Modal/DeleteCustomer";

export default function Customers() {
    const { isLoading, getCustomers } = useGetCustomers();

    const { customers } = useCustomerStore();

    const [isFormOpen, setAddOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [editCustomerId, setEditCustomerId] = useState<string | null>(null);
    const [selected, setSelected] = useState<string[]>([]);
    const [search, setSearch] = useState("");

    const toggleFormModal = (state?: boolean) => {
        const newState = state ?? !isFormOpen;
        setAddOpen(newState);
        if (!newState) setEditCustomerId(null);
        document.body.style.overflow = newState ? "hidden" : "";
    };

    const toggleDeleteModal = (state?: boolean) => {
        const newState = state ?? !isDeleteOpen;
        setDeleteOpen(newState);
        document.body.style.overflow = newState ? "hidden" : "";
    };

    const handleSelect = (_id: string) => {
        setSelected((prev) =>
            prev.includes(_id) ? prev.filter((id) => id !== _id) : [...prev, _id]
        );
    };

    const handleEdit = () => {
        if (selected.length > 0) {
            setEditCustomerId(selected[0]);
            toggleFormModal(true);
        }
    };

    const filteredCustomers = customers.filter((c) =>
        [c._id, c.name, c.phone, c.email, c.address]
            .some((field) =>
                (field ?? "").toLowerCase().includes(search.toLowerCase())
            )
    );

    useEffect(() => {
        if (!customers.length) getCustomers();
    }, [customers.length, getCustomers]);

    return (
        <>
            <div className="flex items-center justify-between bg-gradient-to-r from-[#000046] to-[#1cb5e0] text-white p-4 sm:p-6 shadow-md">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold line-clamp-1">Customers 👥</h1>
                    <p className="text-sm md:text-base font-[500] opacity-90">
                        All your Customers will be listed here
                    </p>
                </div>
            </div>

            <div className="p-4 sm:p-6 pb-[76px] space-y-4 sm:space-y-6">
                <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm">
                    <button
                        onClick={() => toggleFormModal(true)}
                        className="flex flex-col items-center justify-center aspect-square border border-gray-200 hover:shadow-xs transition rounded-xl overflow-hidden cursor-pointer"
                    >
                        <div className="size-full flex items-center justify-center flex-grow bg-white">
                            <RiAddBoxLine size={20} className="text-[#1cb5e0]" />
                        </div>
                        <p className="w-full px-2 pt-1 pb-1.5 text-sm sm:text-sm text-center font-medium bg-gray-50 text-gray-700 leading-[16px]">
                            Add<br />Customer
                        </p>
                    </button>
                    {selected.length > 0 && (
                        <>
                            <button
                                onClick={handleEdit}
                                className="flex flex-col items-center justify-center aspect-square border border-gray-200 hover:shadow-xs transition rounded-xl overflow-hidden cursor-pointer"
                            >
                                <div className="size-full flex items-center justify-center flex-grow bg-white">
                                    <RiEditBoxLine size={20} className="text-[#1cb5e0]" />
                                </div>
                                <p className="w-full px-2 pt-1 pb-1.5 text-sm sm:text-sm text-center font-medium bg-gray-50 text-gray-700 leading-[16px]">
                                    Edit<br />Customer
                                </p>
                            </button>
                            {(() => {
                                const firstSelected = filteredCustomers.find(c => c._id === selected[0]);
                                return firstSelected?.phone ? (
                                    <a
                                        href={`tel:${firstSelected.phone}`}
                                        className="flex flex-col items-center justify-center aspect-square border border-gray-200 hover:shadow-xs transition rounded-xl overflow-hidden cursor-pointer"
                                    >
                                        <div className="size-full flex items-center justify-center flex-grow bg-white">
                                            <RiPhoneLine size={20} className="text-[#1cb5e0]" />
                                        </div>
                                        <p className="w-full px-2 pt-1 pb-1.5 text-sm sm:text-sm text-center font-medium bg-gray-50 text-gray-700 leading-[16px]">
                                            Call<br />Customer
                                        </p>
                                    </a>
                                ) : (
                                    <button
                                        disabled
                                        className="flex flex-col items-center justify-center aspect-square border border-gray-200 bg-gray-100 cursor-not-allowed rounded-xl overflow-hidden"
                                    >
                                        <div className="size-full flex items-center justify-center flex-grow">
                                            <RiPhoneLine size={20} className="text-gray-400" />
                                        </div>
                                        <p className="w-full px-2 pt-1 pb-1.5 text-sm sm:text-sm text-center font-medium text-gray-400 leading-[16px]">
                                            No Phone
                                        </p>
                                    </button>
                                );
                            })()}
                            <button
                                onClick={() => toggleDeleteModal(true)}
                                className="flex flex-col items-center justify-center aspect-square border border-gray-200 hover:shadow-xs transition rounded-xl overflow-hidden cursor-pointer"
                            >
                                <div className="size-full flex items-center justify-center flex-grow bg-white">
                                    <RiDeleteBin6Line size={20} className="text-[#1cb5e0]" />
                                </div>
                                <p className="w-full px-2 pt-1 pb-1.5 text-sm sm:text-sm text-center font-medium bg-gray-50 text-gray-700 leading-[16px]">
                                    Delete<br />{`Customer${selected.length > 1 ? "s" : ""}`}
                                </p>
                            </button>
                        </>
                    )}
                </div>

                {isLoading ? (
                    <div className="mx-auto size-4 border-2 border-white border-t-gray-800 rounded-full animate-spin" />
                ) : (
                    <div className="rounded-xl overflow-hidden border border-gray-300 shadow-xs">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by ID, name, phone, email, or address"
                            className="w-full bg-white px-3 py-2 text-sm shadow-xs outline-none"
                        />
                        <div className="overflow-hidden overflow-x-auto overscroll-x-none">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        {filteredCustomers.length > 0 && (
                                            <th className="p-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.length === filteredCustomers.length && filteredCustomers.length > 0}
                                                    onChange={(e) => setSelected(e.target.checked ? filteredCustomers.map(c => c._id) : [])}
                                                />
                                            </th>
                                        )}
                                        <th className="text-start font-semibold p-2">Name</th>
                                        <th className="text-start font-semibold p-2">Phone</th>
                                        <th className="text-start font-semibold p-2">Email</th>
                                        <th className={`${filteredCustomers.length > 0 ? "min-w-[200px]" : ""} text-start font-semibold p-2`}>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map((customer, index) => (
                                            <tr
                                                key={index}
                                                className={`text-gray-700 text-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                                            >
                                                <td className="py-1 px-2 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.includes(customer._id)}
                                                        onChange={() => handleSelect(customer._id)}
                                                    />
                                                </td>
                                                <td className="py-1 px-2 text-start whitespace-nowrap">
                                                    {customer.name}
                                                </td>
                                                <td className="py-1 px-2 text-start">{customer.phone}</td>
                                                <td className="py-1 px-2 text-start">{customer.email}</td>
                                                <td className="py-1 px-2 text-start line-clamp-1">
                                                    {customer.address}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="text-gray-700 text-center bg-white">
                                            <td colSpan={4} className="py-4 text-center font-medium">
                                                {customers.length === 0 ? (
                                                    "No customers added yet..."
                                                ) : filteredCustomers.length === 0 ? (
                                                    "Customer not found"
                                                ) : ""}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {isFormOpen && (
                <CustomerForm
                    toggleModal={toggleFormModal}
                    mode={editCustomerId ? "update" : "add"}
                    initialData={editCustomerId ? customers.find(c => c._id === editCustomerId) : undefined}
                />
            )}

            {isDeleteOpen && (
                <DeleteCustomer
                    toggleModal={toggleDeleteModal}
                    selected={selected}
                />
            )}
        </>
    )
}