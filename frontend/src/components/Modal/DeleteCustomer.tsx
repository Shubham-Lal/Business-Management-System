import useDeleteCustomers from "../../hooks/customer/useDeleteCustomers";

interface DeleteCustomerProps {
    toggleModal: (state?: boolean) => void;
    selected: string[]
}

export default function DeleteCustomer({ toggleModal, selected }: DeleteCustomerProps) {
    const { isDeleting, deleteCustomers } = useDeleteCustomers();

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ok = await deleteCustomers(selected);
        if (ok) toggleModal(false);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 grid place-items-center z-50"
            onClick={() => toggleModal(false)}
        >
            <form
                onSubmit={handleDelete}
                className="relative bg-white rounded-xl shadow-lg w-[calc(100%-32px)] sm:max-w-lg max-h-[100svh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="px-6 pt-6 text-lg font-semibold text-gray-800 mb-4">
                    Confirm Deletion
                </h2>

                <div className="mb-4 px-6 text-gray-700">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">{selected.length}</span> customer
                    {selected.length > 1 ? "s" : ""}? This action cannot be undone.
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
                        disabled={isDeleting}
                        className={`
                            relative w-full py-2 px-4 flex items-center justify-center gap-2 font-semibold text-white rounded-md transition duration-200 
                            ${isDeleting
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700 cursor-pointer"
                            }
                        `}
                    >
                        {isDeleting && (
                            <div className="absolute right-2 size-4 border-2 border-white border-t-gray-800 rounded-full animate-spin" />
                        )}
                        Delete
                    </button>
                </div>
            </form>
        </div>
    )
}