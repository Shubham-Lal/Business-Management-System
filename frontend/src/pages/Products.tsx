import { useState } from "react";
import { RiAddBoxLine } from "react-icons/ri";
import useProductStore from "../store/productStore";
import ProductForm from "../components/Modal/ProductForm";

export default function Products() {
    const { products } = useProductStore();

    const [isFormOpen, setAddOpen] = useState(false);
    const [editProductId, setEditProductId] = useState<string | null>(null);
    const [selected, setSelected] = useState<string[]>([]);

    const toggleFormModal = (state?: boolean) => {
        const newState = state ?? !isFormOpen;
        setAddOpen(newState);
        if (!newState) setEditProductId(null);
        document.body.style.overflow = newState ? "hidden" : "";
    };

    return (
        <>
            <div className="flex items-center justify-between bg-gradient-to-r from-[#000046] to-[#1cb5e0] text-white p-4 sm:p-6 shadow-md">
                <div>
                    <h1 className="text-xl md:text-2xl font-semibold line-clamp-1">Customers 👥</h1>
                    <p className="text-sm md:text-base font-[500] opacity-90">
                        All your Products will be listed here
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
                            Add<br />Product
                        </p>
                    </button>
                    {selected.length > 0 && (
                        <>
                            
                        </>
                    )}
                </div>


            </div>

            {isFormOpen && (
                <ProductForm
                    toggleModal={toggleFormModal}
                    mode={editProductId ? "update" : "add"}
                    initialData={editProductId ? products.find(c => c._id === editProductId) : undefined}
                />
            )}
        </>
    )
}